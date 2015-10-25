var jwt = require('jsonwebtoken');
var jwtSecret = require('../config/jwt_secret');
var User = require('../models/user');

module.exports = function(req, res, next) {
  var apiKey = (req.query.api_key || req.body.api_key);
  var authorizationHeader = req.headers.authorization;
  var isLoggingInOrRegistering = req.body.user;

  // Find user by API key
  if (apiKey && !isLoggingInOrRegistering) {
    User.findOne({ api_key: apiKey }).then(function(user) {
      if (user) {
        req['user'] = user;
        next();
      } else {
        res.sendStatus(401);
      }
    });
  }

  // Find user by JWT decoded user ID from Authorization header
  else if (authorizationHeader && !isLoggingInOrRegistering) {
    jwt.verify(authorizationHeader, jwtSecret, function(err, decodedId) {
      if (decodedId) {
        User.findOne({ _id: decodedId }).then(function(user) {
          req['user'] = user;
          next();
        })
      } else {
        res.sendStatus(401);
      }
    });
  }

  else {
    next();
  }
};
