const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		default: ''
	},
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

module.exports = mongoose.model('User', 'UserSchema');