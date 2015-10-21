var db = require('mongoose');
db.connect('mongodb://localhost/caedence_net_development');

var NoteSchema = db.Schema({
  title: String,
  body_html: String,
  body_text: String,
  user_id: Number,
  url: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

NoteSchema.pre('save', function(next) {
  this.url = '/notes/' + this._id;
  this.updated_at = Date.now;
  next();
});

var Note = db.model('Note', NoteSchema);

module.exports = Note;
