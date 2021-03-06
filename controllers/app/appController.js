const User = require('../../lib/models/User');

module.exports = {
	logUser
};

function logUser(profile, done) {
	console.log(profile);

	const newUser = {
		github: {
			id: profile.id,
			url: profile._json.html_url
		},
		username: profile._json.login,
		name: profile.displayName,
		image: profile._json.avatar_url,
		email: profile._json.email
	};

	User.findOrCreate(newUser, done);
}