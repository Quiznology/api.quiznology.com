const expect   = require('chai').expect;
const User     = require('../index');
const mongoose = require('mongoose');
const userData = {
  minimal : require('../data/sample.minimal.json'),
  full    : require('../data/sample.full.json')
};

describe('User instance data', function() {

  describe('should fail if ', () => {
    it('username was not set', testErrorIfFieldIsMissing('username') );
    it('email was not set',    testErrorIfFieldIsMissing('email') );
    it('email is not a proper email', testErrorIfFieldIsMissing('username', {email: 'this is not an email'}) );
    it('friends is not an array', testErrorIfFieldIsMissing('friends', {friends: {}}) );
    it('friends are not ids',     testErrorIfFieldIsMissing('friends', {friends: ['123']}) );

    function testErrorIfFieldIsMissing(field, value){
      return (done) => {
        const user = new User(value);
        user.validate(function(err) {
          expect(err.errors[field]).to.exist;
          done();
        });
      };
    }
  });

  describe('should be valid if', () => {
    it('the minimun data is provided', (done) => {
      const user = new User(userData.minimal);
      user.validate(function(err) {
        expect(err).to.be.not.ok;
        done();
      });
    });

    it('every data type is right', (done) => {
      userData.full.updatedAt = new Date();
      userData.full.questions = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
      const user = new User(userData.full);
      user.validate(function(err) {
        expect(err).to.be.not.ok;
        done();
      });
    });

  });




});
