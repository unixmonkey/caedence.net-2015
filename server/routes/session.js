var router = require('express').Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

router.post('/', function(req, res) {
  User.findOne({ username: req.body.user.username }).then(function(user) {
    if (user) {
      user.authenticate(req.body.user.password, function(isMatch) {
        if (isMatch) { res.json({ auth_token: 'foo', user: user }); } // add JWT token to this
        else { res.json({ error: "Could not authenticate." }); }
      });
    }
  });
});

module.exports = router;
