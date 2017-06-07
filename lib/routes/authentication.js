const passport = require('passport');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../../config');

const userToken = (user) => {
	const timestamp = new Date().getDate();

	return jwt.sign({ id: user._id, iat: timestamp }, config.sessionSecret);
};

router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback', passport.authenticate('github'), (req, res) => {
	if (req.isAuthenticated()) {
		res.status(200).json({ success: true, token: userToken(req.user), user: req.user });
		return;
	}

	res.status(400).json({ success: false, user: null, error: 'There was a problem authenticating the user.' });
});

module.exports = router;