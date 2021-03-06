var db = require('../db');
var sanitizeHtml = require('sanitize-html');
var ObjectIdType = db.Schema.Types.ObjectId;

var NoteSchema = db.Schema({
  title: String,
  body_html: String,
  body_text: String,
  user: { type: ObjectIdType, ref: 'User' },
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

// Override toJSON to rename _id to id and remove __v
NoteSchema.methods.toJSON = function() {
  var object = this.toObject();
  object.id = object._id;
  delete object._id;
  delete object.__v;
  return object;
}

module.exports = NoteSchema;
