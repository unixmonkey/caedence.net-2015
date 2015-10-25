var db = require('../db');
var UserSchema = require('./user');
var User = db.model('User', UserSchema);

module.exports = User;
