const expect   = require('chai').expect;
const sinon = require('sinon');
const User  = require('../index');
const userData = { full : require('../data/sample.full.json') };
sinon.test = require('sinon-test').configureTest(sinon);
const sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);

describe('User functions', () => {
  it('should return the existing user if it already exists', sinon.test(function() {
    var repostObject = { name: 'foo' };
    this.stub(User, 'create');
    this.stub(User, 'findOne').returnsPromise().resolves(repostObject);
    const user = new User(userData.full);

    User.findOrCreate(user, function(err, data) {
      expect(err).to.be.not.ok;
      expect(data).to.be.equal(repostObject);
    });

    sinon.assert.notCalled(User.create);
    sinon.assert.calledWith(User.findOne, {
      'github.id': userData.full.github.id
    });
  }));

  it('should return a created user if it does not exists', sinon.test(function() {
    var repostObject = { name: 'foo' };
    this.stub(User, 'create').returnsPromise().resolves(repostObject);
    this.stub(User, 'findOne').returnsPromise().resolves(undefined);
    const user = new User(userData.full);

    User.findOrCreate(user, function(err, data) {
      expect(err).to.be.not.ok;
      expect(data).to.be.equal(repostObject);
    });

    sinon.assert.called(User.create);
    sinon.assert.calledWith(User.findOne, {
      'github.id': userData.full.github.id
    });
  }));

  it('should return an error when User.findOne method fails', sinon.test(function() {
    const errorMgs = 'findOne error';
    this.stub(User, 'create');
    this.stub(User, 'findOne').returnsPromise().rejects(new Error(errorMgs));
    const user = new User(userData.full);

    User.findOrCreate(user, function(err, data) {
      expect(err).to.be.ok;
      expect(err.message).to.be.equal(errorMgs);
    });

    sinon.assert.notCalled(User.create);
    sinon.assert.calledWith(User.findOne, {
      'github.id': userData.full.github.id
    });
  }));

  it('should return an error when User.create method fails', sinon.test(function() {
    const errorMgs = 'create error';
    this.stub(User, 'create').returnsPromise().rejects(new Error(errorMgs));
    this.stub(User, 'findOne').returnsPromise().resolves(undefined);
    const user = new User(userData.full);

    User.findOrCreate(user, function(err, data) {
      expect(err).to.be.ok;
      expect(err.message).to.be.equal(errorMgs);
    });

    sinon.assert.called(User.create);
    sinon.assert.calledWith(User.findOne, {
      'github.id': userData.full.github.id
    });
  }));
});
