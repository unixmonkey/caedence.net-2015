var router = require('express').Router();
var jwt = require('jsonwebtoken');
var jwtSecret = require('../config/jwt_secret');
var User = require('../models/user');

router.post('/', function(req, res) {
  User.findOne({ username: req.body.user.username }).then(function(user) {
    if (user) {
      user.authenticate(req.body.user.password, function(isMatch) {
        var token = jwt.sign(user._id, jwtSecret, { expiresInMinutes: 60*24 });
        if (isMatch) { res.json({ auth_token: token, user: user }); }
        else { res.json({ error: "Could not authenticate." }); }
      });
    }
  });
});

module.exports = router;
