const questionSchema = require('./schema.js');
const mongoose = require('mongoose');

module.exports = mongoose.model('User', questionSchema);