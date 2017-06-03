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
	body: String,
	answers: [{
		type: Object,
		validate: [isCorrectLength]
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

function isCorrectLength(answers) {
	return answers.length === 4;
}