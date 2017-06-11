const express        = require('express'),
			app            = express(),
			morgan         = require('morgan'),
			bodyParser     = require('body-parser'),
			methodOverride = require('method-override'),
			mongoose       = require('mongoose'),
			session        = require('express-session'),
			cors           = require('cors'),
			redis          = require('redis'),
			redisStore     = require('connect-redis')(session),
			redisClient    = redis.createClient(),
			passport       = require('passport'),
			GithubStrategy = require('passport-github2').Strategy,
			config         = require('./config'),
			appController  = require('./controllers/app/appController'),
			routes         = require('./lib/routes');

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

// passport.serializeUser(function(user, done) {
// 	done(null, user);
// });
// passport.deserializeUser((function(obj, done) {
// 	done(null, obj);
// }));
// passport.use(new GithubStrategy({
// 	clientID: config.github.clientID,
// 	clientSecret: config.github.clientSecret,
// 	callbackURL: config.github.callbackURL,
// 	scope: "user:email"
// }, (accessToken, refreshToken, profile, done) => {
// 	appController.logUser(profile, done);
// }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());

if (config.morgan.user) {
	app.use(config.morgan.log);
}

app.use(cors());
routes(app);

app.all('/*', function (req, res) {
  res.send(404);
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
