var express = require('express');
var app = express();

// Serve assets in /public
var path = require('path');
app.use(express.static(path.join(__dirname, 'client')));

// Body parsing for JSON POST payloads
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var cors = require('./server/middlewares/cross_origin_requests');
app.use(cors);

var http_verbs = require('./server/middlewares/http_verbs');
app.use(http_verbs);

var add_user_to_request = require('./server/middlewares/add_user_to_request');
app.use(add_user_to_request);

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
