// Connect to database and make `db` available when require'd
var db = require('mongoose');
db.connect('mongodb://localhost/caedence_net_development');

module.exports = db;
