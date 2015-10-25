var router = require('express').Router();
var Note = require('../models/note');

router.post('/notes/', function(req, res) {
  var newNote = new Note({
    user: req.user,
    title: req.body.note.title,
    body_html: req.body.note.body_html
  });
  newNote.save(function(err) {
    if (err) { console.log('OHNOES!', err); }
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
  Note.find({ user: req.user }).then(function(notes) {
    res.json(notes);
  });
});

router.get('/notes/:id', function(req, res) {
  var id = req.params.id;
  var note = Note.findOne({ user: req.user, _id: id }).then(function(note) {
    res.json(note);
  });
});

router.put('/notes/:id', function(req, res) {
  Note.findOne({ user: req.user, _id: req.params.id }).then(function(note) {
    note.title = req.body.note.title;
    note.body_html = req.body.note.body_html;
    note.save().then(function() {
      res.json({ message: 'Successfully updated note', note: note });
    });
  });
});

router.delete('/notes/:id', function(req, res) {
  Note.findOne({ user: req.user, _id: req.params.id }).then(function(note) {
    note.remove().then(function(){
      res.json({ message: 'Successfully deleted note.' });
    });
  });
});

module.exports = router;
