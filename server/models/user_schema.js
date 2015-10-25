var bcrypt = require('bcryptjs');
var db = require('../db');

var UserSchema = db.Schema({
  username: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  password_digest: { type: String, required: true },
  api_key: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next) {
  if (!this.api_key) {
    // create bcrypt hash of hash for the api_key
    this.api_key = bcrypt.hashSync(this.password_digest, 10);
  }
  this.updated_at = Date.now;
  next();
});

// Override toJSON to exclude fields from Express res.json() and rename _id to id
UserSchema.methods.toJSON = function() {
  var object = this.toObject();
  delete object.password_digest;
  object.id = object._id;
  delete object._id;
  delete object.__v;
  return object;
}

// Create method to compare passed-in password to password_digest
UserSchema.methods.authenticate = function(password, callback) {
  bcrypt.compare(password, this.password_digest, function(err, isMatch) {
    callback(isMatch);
  });
}

module.exports = UserSchema;
