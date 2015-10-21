var router = require('express').Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');

router.post('/users/', function(req, res) {
  var newUser = new User({
    username: req.body.username,
    name: req.body.name,
    password_digest: bcrypt.hashSync(req.body.password, 10),
  });
  newUser.save(function(err) {
    if (err) { console.log('OHNOES!', err); }
    else { res.json({ user: newUser }); }
  });
});

module.exports = router;
