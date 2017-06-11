const authRoutes = require('./authentication');

module.exports = (app) => {
	app.get('/', function (req, res) {
		res.send('vue-authenticate');
	})

	app.use(authRoutes);
};
