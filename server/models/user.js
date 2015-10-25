var db = require('../db');
var UserSchema = require('./user_schema');
var User = db.model('User', UserSchema);

module.exports = User;
