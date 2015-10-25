var db = require('../db');
var sanitizeHtml = require('sanitize-html');

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
  this.body_text = sanitizeHtml(this.body_html, {
    allowedTags: [],
    allowedAttributes: []
  });
  this.updated_at = Date.now;
  next();
});

// Override toJSON to rename _id to id and __v to version
NoteSchema.methods.toJSON = function() {
  var object = this.toObject();
  object.id = object._id;
  delete object._id;
  object.version = object.__v;
  delete object.__v;
  return object;
}

module.exports = NoteSchema;
