// Connect to database and make `db` available when require'd
var db = require('mongoose');
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/caedence_net_development';
db.connect(mongoUri);

module.exports = db;
