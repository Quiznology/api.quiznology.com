const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	github: {
		id: String,
		url: String,
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	name: String,
	image: String,
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
		unique: true
	},
	friends: {
		type: [Schema.Types.ObjectId],
		ref: 'Friend'
	},
	tests: {
		type: Array,
		default: []
	},
	actualScore: {
		type: Number,
		default: 0
	},
	questions: {
		type: [Schema.Types.ObjectId],
		ref: 'Question'
	},
});

userSchema.statics.findOrCreate = function(newUser, done) {
	this.findOne({ github: { id : newUser.github.id }})
	.then((user) => {
		if (!user) {
			return this.create(newUser);
		}

		done(null, user);
	})
	.then((user) => {
		done(null, user);
	})
	.catch((err) => {
		done(err.message, null);
	});
}

module.exports = mongoose.model('User', userSchema);