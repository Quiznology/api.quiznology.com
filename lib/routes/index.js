const authRoutes = require('./authentication');

module.exports = (app) => {
	app.get('/', (req, res) => {
		res.status(200).send(req.user);
	});

	app.use(authRoutes);
};