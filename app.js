const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const redisClient = redis.createClient();
const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const config = require('./config');
const appController = require('./controllers/app/appController');

app.use(session({
	secret: config.sessionSecret || 'Frase muy secreta',
 	store: new redisStore({
	 	host: config.redis.host,
 		port: config.redis.port,
 		client: redisClient,
 		ttl: 260
	}),
	saveUninitialized: false,
 	resave: false,
	 cookie: {
		 httpOnly: true,
		 maxAge: 7*60*24*3600*1000
	 }
}));

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser((function(obj, done) {
	done(null, obj);
}));
passport.use(new GithubStrategy({
	clientID: config.github.clientID,
	clientSecret: config.github.clientSecret,
	callbackURL: config.github.callbackURL,
	scope: "user:email"
}, (accessToken, refreshToken, profile, done) => {
	appController.logUser(profile, done);
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());


if (config.morgan.user) {
	app.use(config.morgan.log);
}

const allowCrossDomain = (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Accept, Content-Type, X-Access-Token, Cache-Control, Pragma');
	next();
};
app.use(allowCrossDomain);

app.get('/', (req, res) => {
	res.status(200).send(req.user);
});

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github'), (req, res) => {
	res.redirect('/');
});

app.listen(config.port, (err) => {
	if (err) throw new Error(err.message);

	console.log(`Server is up and running on port: ${config.port}`);
	mongoose.connect(config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.db, (err) => {
		if (err) throw new Error(err.message);

		console.log('Connected to the database: ' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.db);
		mongoose.Promise = require('bluebird');
	});
});