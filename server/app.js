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
app.use('/notes', require('./routes/notes'));
app.use('/users', require('./routes/users'));
app.use('/session', require('./routes/session'));

// Start server
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
  console.log('Listening on http://localhost:', app.get('port'));
});
