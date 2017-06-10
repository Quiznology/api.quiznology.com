const passport = require('passport');
const router = require('express').Router();
const authController = require('../../controllers/auth/authController');

router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback', passport.authenticate('github'), authController.login);

module.exports = router;