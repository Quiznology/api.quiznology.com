const questionSchema = require('./schema.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = mongoose.model('Question', questionSchema);