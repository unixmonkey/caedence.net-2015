var bcrypt = require('bcryptjs');
var db = require('mongoose');
db.createConnection('mongodb://localhost/caedence_net_development');

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

// Override toJSON to exclude fields from Express res.json()
UserSchema.methods.toJSON = function() {
  var object = this.toObject();
  delete object.password_digest;
  return object;
}

var User = db.model('User', UserSchema);

module.exports = User;
