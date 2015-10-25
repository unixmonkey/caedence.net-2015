(function() {
  angular.module('notely.notes.service', [])
    .service('notes', notesService);

  notesService['$inject'] = ['$http', '$filter', '$state', 'constants'];
  function notesService($http, $filter, $state, constants) {
    var notes = [];
    var user = {}

    this.all = function() {
      return notes;
    }

    this.findById = function(noteId) {
      var note = ($filter('filter')(notes, {
        id: noteId
      }, true)[0] || {});

      return angular.copy(note);
    };

    this.fetchNotes = function() {
      return $http.get(constants.apiBasePath + 'notes')
        .success(function(notesData) {
          notes = notesData;
        });
    };

    this.replaceNote = function(note) {
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === note.id) {
          notes.splice(i, 1);
          notes.unshift(note);
          break;
        }
      }
    };

    this.removeNote = function(note) {
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === note.id) {
          notes.splice(i, 1);
          break;
        }
      }
    };

    this.create = function(note) {
      $http.post(constants.apiBasePath + 'notes', {
        note: {
          title: note.title,
          body_html: note.body_html
        }
      })
        .success(function(noteData) {
          notes.unshift(noteData.note);
          $state.go('notes.form', { noteId: noteData.note.id });
        });
    }

    this.update = function(note) {
      var self = this;
      return $http.put(constants.apiBasePath + 'notes/' + note.id, {
        note: {
          title: note.title,
          body_html: note.body_html
        }
      }).success(function(noteData) {
        self.replaceNote(noteData.note);
      });
    }

    this.delete = function(note) {
      var self = this;
      return $http.delete(constants.apiBasePath + 'notes/' + note.id)
      .success(function(result) {
        self.removeNote(note);
      });
    }
  }
})();
