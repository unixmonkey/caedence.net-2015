var app = require('express')();
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
  next();
});

var Note = db.model('Note', NoteSchema);

app.post('/notes/', function(req, res) {
  var newNote = new Note({
    title: 'First Note!',
    body_html: '<p>First!</p>',
    body_text: 'First!'
  });
  newNote.save(function(err) {
    if (err) { console.log('OHNOES!'); }
  });
});

// create some records with mongo cli like this:
// $ mongod
// > use caedence_net_development
// > db.notes.insert({ title: "Hello", body_html: "<p>World</p>", body_text: "World" })
// WriteResult({ "nInserted" : 1 })
// > db.notes.find()
// { "_id" : ObjectId("562473c0802fa33ca991217b"), "title" : "Hello", "body_html" : "<p>World</p>", "body_text" : "World" }
app.get('/notes/', function(req, res) {
  Note.find().then(function(notes) {
    res.json(notes);
  });
});

app.get('/notes/:id', function(req, res) {
  var id = req.params.id;
  var note = Note.findOne({ '_id': id }).then(function(note) {
    res.json(note);
  });
});

app.get('/', function(req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
});
