const sinon = require('sinon');
const User  = require('../index');
const userData = { full : require('../data/sample.full.json') };
sinon.test = require('sinon-test').configureTest(sinon);
const sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);

describe('User functions', () => {
  it('should return the existing user if it already exists', sinon.test(function() {

    var repostObject = { name: 'foo' };
    this.stub(User, 'findOne').returnsPromise().resolves(repostObject);
    const user = new User(userData.full);

    User.findOrCreate(user, function() { });

    sinon.assert.calledWith(User.findOne, {
      'github.id': userData.full.github.id
    });
  }));
});
