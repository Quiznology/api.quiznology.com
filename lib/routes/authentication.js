const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Axios = require('axios');

const User = require('../models/User');

const config = require('../../config');
const github = config.auth.github;
const GITHUB_ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_AUTHORIZE_URL = 'https://api.github.com/user?access_token=';

const userToken = (user) => {
	const timestamp = new Date().getDate();
	return jwt.sign({ id: user._id, iat: timestamp }, config.sessionSecret);
};

router.post('/auth/:provider', function(req, res){
	switch (req.params.provider) {
		case 'github':
			githubAuth(req, res);
			break;
	}
});

router.get('/user', function(req, res) {
	const access_token = req.query.access_token;
	Axios.get(`${GITHUB_AUTHORIZE_URL}${access_token}`)
	.then(function(response) {
		res.status(200).json(response.data)		
	})
	.catch(function(err) {
		res.status(500).json(err);
	})
})

function githubAuth(req, res) {
	Axios.post(GITHUB_ACCESS_TOKEN_URL, {
		client_id: github.clientID,
		client_secret: github.clientSecret,
		code: req.body.code,
		redirect_uri: req.body.redirectUri,
		state: req.body.state,
		scope: 'user',
		grant_type: 'authorization_code'
	})
	.then(function (response) {
		var responseJson = parseQueryString(response.data)
		if (responseJson.error) {
		  res.status(500).json({ error: responseJson.error })
		} else {
		res.json(responseJson)
		}
	}).catch(function (err) {
		res.status(500).json(err)
	});
}

function parseQueryString(str) {
  let obj = {};
  let key;
  let value;
  (str || '').split('&').forEach((keyValue) => {
    if (keyValue) {
      value = keyValue.split('=');
      key = decodeURIComponent(value[0]);
      obj[key] = (!!value[1]) ? decodeURIComponent(value[1]) : true;
    }
  });
  return obj;
}





module.exports = router;
