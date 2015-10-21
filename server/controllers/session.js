var router = require('express').Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

router.post('/session/', function(req, res) {
  User.findOne({ username: req.body.username }).then(function(user) {
    if (user) {
      user.authenticate(req.body.password, function(isMatch) {
        if (isMatch) { res.json({ user: user }); }
        else { res.json({ error: "Could not authenticate." }); }
      });
    }
  });
});

module.exports = router;
