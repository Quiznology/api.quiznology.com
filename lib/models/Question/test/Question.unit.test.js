const sinon = require('sinon');
const mongoose = require('mongoose');
const Question  = require('../index');
const questionData = { full : require('../data/sample.full.json') };
sinon.test = require('sinon-test').configureTest(sinon);
const sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);

describe('Question functions', () => {
	it('should create a question', sinon.test(function() {
		let repostObject = { name: 'foo' };
		this.stub(Question, 'create').returnsPromise().resolves(repostObject);
		this.stub(Question, 'findOne').returnsPromise().resolves(undefined);

		questionData.full.owner = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
		const question = new Question(questionData.full);

		Question.create(question, (err, data) => {
			expect(err).to.be.not.ok;
			expect(data).to.be.equal(repostObject);
		});

		Question.findOne({owner: questionData.full.owner}, (err, data) => {
			expect(err).to.be.not.ok;
			expect(data).to.be.equal(questionData.full);
		});

		sinon.assert.called(Question.create);
		sinon.assert.calledWith(Question.findOne, {
			'owner': questionData.full.owner
		});
	}));
});