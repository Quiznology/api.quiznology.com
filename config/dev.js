const github = require('./github_api');

module.exports = {
	id: "dev",
	port: process.env.PORT || 3001,
	morgan: {
		use: true,
		log: 'dev'
	},
	mongo: {
		host: process.env.MONGO_HOST || 'mongodb://localhost',
		port: process.env.MONGO_PORT || 27017,
		db  : process.env.MONGO_DB   || "quiznology"
	},
	sessionSecret: process.env.SESSION_SECRET || 'Frase muy secreta',
	redis: {
		host: process.env.REDIS_HOST || 'localhost',
		port: process.env.REDIS_PORT || 6379
	},
	auth: {
		github
	}
};
