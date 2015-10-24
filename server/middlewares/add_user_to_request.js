var User = require('../models/user');

module.exports = function(req, res, next) {
  var apiKey = (req.query.api_key || req.body.api_key);
  var isLoggingInOrRegistering = (req.body.user);
  if (apiKey && !isLoggingInOrRegistering) {
    User.findOne({ api_key: apiKey }).then(function(user){
      if (user) {
        req['user'] = user;
        next();
      } else {
        res.sendStatus(401)
      }
    });
  } else {
    next();
  }
};
