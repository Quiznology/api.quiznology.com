const User = require('../../lib/models/User');

module.exports = {
	logUser
};

function logUser(profile, done) {
	User.findOrCreate({ githubID: profile.id })
	.then((user) => {
		done(null, user);
	})
	.catch((err) => {
		done(err, null);
	});
}