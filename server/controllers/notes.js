var router = require('express').Router();
var Note = require('../models/note');

router.post('/notes/', function(req, res) {
  var newNote = new Note({
    title: req.body.title,
    body_html: req.body.body_html
  });
  newNote.save(function(err) {
    if (err) { console.log('OHNOES!'); }
    else { res.json({ note: newNote }); }
  });
});

// create some records with mongo cli like this:
// $ mongo
// > use caedence_net_development
// > db.notes.insert({ title: "Hello", body_html: "<p>World</p>", body_text: "World" })
// WriteResult({ "nInserted" : 1 })
// > db.notes.find()
// { "_id" : ObjectId("562473c0802fa33ca991217b"), "title" : "Hello", "body_html" : "<p>World</p>", "body_text" : "World" }
router.get('/notes/', function(req, res) {
  Note.find().then(function(notes) {
    res.json(notes);
  });
});

router.get('/notes/:id', function(req, res) {
  var id = req.params.id;
  var note = Note.findOne({ '_id': id }).then(function(note) {
    res.json(note);
  });
});

router.delete('/notes/:id', function(req, res) {
  Note.findOne({ '_id': req.params.id }).remove(function() {
    res.json({ message: 'Successfully deleted note.' });
  });
});

module.exports = router;
