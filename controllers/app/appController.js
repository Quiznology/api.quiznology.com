const User = require('../../lib/models/User');

module.exports = {
	logUser
};

function logUser(profile, done) {
	const newUser = {
		github: {
			id: profile.id,
			url: profile.profileUrl
		},
		username: profile.username,
		name: profile.displayName,
		image: profile._json.avatar_url,
		email: profile._json.email
	};

	User.findOrCreate(newUser, done);
}