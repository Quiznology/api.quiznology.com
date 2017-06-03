const userSchema = require('./schema.js');
const mongoose = require('mongoose');

userSchema.statics.findOrCreate = findOrCreate;

module.exports = mongoose.model('User', userSchema);

function findOrCreate(newUser, done) {
	this.findOne({ 'github.id': newUser.github.id })
	.then( (user) => (user || this.create(newUser)) )
	.then( (user) => done(null, user) )
	.catch( (err) => done(err.message, null) );
}
