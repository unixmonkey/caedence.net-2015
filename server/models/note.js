var db = require('../db');
var NoteSchema = require('./note_schema')
var Note = db.model('Note', NoteSchema);

module.exports = Note;
