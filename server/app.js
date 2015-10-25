var express = require('express');
var app = express();

// Serve assets in /public
var path = require('path');
app.use(express.static(path.join(__dirname, '../client')));

// Body parsing for JSON POST payloads
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Middlewares
app.use(require('./middlewares/cross_origin_requests'));
app.use(require('./middlewares/http_verbs'));
app.use(require('./middlewares/add_user_to_request'));

// Mount controller files
app.use('/', require('./controllers/notes'));
app.use('/', require('./controllers/users'));
app.use('/', require('./controllers/session'));

// Start server
var server = app.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
});
