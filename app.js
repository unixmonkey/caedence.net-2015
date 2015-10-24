var express = require('express');
var app = express();

// Serve assets in /public
var path = require('path');
app.use(express.static(path.join(__dirname, 'client')));

// Body parsing for JSON POST payloads
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Allow serving from another domain or protocol
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  next();
});

// Reject requests without api_key
var User = require('./server/models/user');
app.use(function(req, res, next) {
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
});

// mount controller files
var notes = require('./server/controllers/notes');
app.use('/', notes);
var users = require('./server/controllers/users');
app.use('/', users);
var session = require('./server/controllers/session');
app.use('/', session);

// Start server
var server = app.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
});
