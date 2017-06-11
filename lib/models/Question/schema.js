const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
	owner: {
		type: Schema.ObjectId,
		required: true
	},
	status: {
		type: String,
		default: 'pending'
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	},
	body: {
		type: String,
		required: true
	},
	answers: [{
		id: {
			type: Number,
			required: true
		},
		body: {
			type: String,
			required: true
		}
	}],
	correct: {
		type: Number,
		required: true
	},
	answered: Number,
	failed: Number,
	scope: Number,
	position: Number
});