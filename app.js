const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const redisClient = redis.createClient();
const config = require('./config');

app.use(session({
	secret: config.sessionSecret || 'Frase muy secreta',
	store: new redisStore({
		host: config.redis.host,
		port: config.redis.port,
		client: redisClient,
		ttl: 260
	}),
	saveUninitialized: false,
	resave: false
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.listen(config.port, (err) => {
	if (err) throw new Error(err.message);

	console.log(`Server is up and running on port ${config.port}`);
});