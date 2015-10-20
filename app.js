var express = require('express');
var app = express();

// Serve assets in /public
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Body parsing for JSON POST payloads
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// mount controller files
var notes = require('./server/notes');
app.use('/', notes);

var server = app.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
});
