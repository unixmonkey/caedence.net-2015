var app = require('express')();

app.get('/', function(req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
});
