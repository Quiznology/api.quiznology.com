const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = {
	login,
	auth
};

const userToken = (user) => {
	const timestamp = new Date().getDate();
	const token = jwt.sign({ id: user._id, iat: timestamp }, config.sessionSecret, { expiresIn: '72h' });

	return token;
};

function login(req, res) {
	if (req.isAuthenticated()) return res.status(200).json({ success: true, token: userToken(req.user), user: req.user });

	res.status(400).json({ success: false, user: null, error: 'There was a problem authenticating the user.' });
};

function auth(req, res, next) {
	const token = req.body['token'] || req.params['token'] || req.headers['x-access-token'] || req.headers['authorization'];

	if (token) {
		jwt.verify(token, config.sessionSecret, (err, decoded) => {
			if (err) return res.status(498).json({ success: false, message: 'Invalid token.'});

			req.decoded = decoded;
			next();
		});
	} else {
		res.status(499).json({ success: false, message: 'No token provided.' });
	}
};