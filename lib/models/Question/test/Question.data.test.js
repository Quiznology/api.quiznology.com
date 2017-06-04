const expect   = require('chai').expect;
const Question     = require('../index');
const mongoose = require('mongoose');
const questionData = {
	minimal : require('../data/sample.minimal.json'),
	full    : require('../data/sample.full.json')
};

describe('Question instance data', function() {
	describe('should fail if ', () => {
		it('owner was not set', testErrorIfFieldIsMissing('owner'));
		it('correct was not set', testErrorIfFieldIsMissing('correct'));

		function testErrorIfFieldIsMissing(field, value) {
			return (done) => {
				const question = new Question(value);
				question.validate((err) => {
					expect(err.errors[field]).to.exist;
					done();
				});
			};
		}
	});

	describe('should be valid if', () => {
		it('the minimun data is provided', (done) => {
			const question = new Question(questionData.minimal);
			questionData.minimal.owner = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
			question.validate((err) => {
				if (err) console.log(err.message);

				expect(err).to.be.not.ok;
				done();
			});
		});

		it('every data type is right', (done) => {
			questionData.full.createdAt = Date.now();
			questionData.full.updatedAt = Date.now();
			questionData.full.owner = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
			const question = new Question(questionData.full);
			question.validate((err) => {
				expect(err).to.be.not.ok;
				done();
			});
		});
	});
});
