var router = require('express').Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var jwtSecret = require('../config/jwt_secret');

router.post('/', function(req, res) {
  var newUser = new User({
    username: req.body.user.username,
    name: req.body.user.name,
    password_digest: bcrypt.hashSync(req.body.user.password, 10),
  });
  newUser.save(function(err, user) {
    if (err) {
      console.log('OHNOES!', err);
    } else {
      var token = jwt.sign(user._id, jwtSecret, { expiresIn: 24*60*60 });
      res.json({ auth_token: token, user: user });
    }
  });
});

module.exports = router;
