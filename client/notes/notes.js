import '../directives/bd-note-form'
import '../directives/bd-notes'

(function() {
  angular.module('notely.notes', [
    'ui.router',
    'textAngular'
  ])
  .config(notesConfig);

  notesConfig['$inject'] = ['$stateProvider'];
  function notesConfig($stateProvider) {
    $stateProvider

      .state('notes', {
        url: '/notes',
        abstract: true,
        resolve: {
          notesLoaded: function($q, $state, $timeout, notes, CurrentUser) {
            var deferred = $q.defer();
            $timeout(function() {
              if (CurrentUser.get().id) {
                notes.fetchNotes().success(function() {
                  deferred.resolve();
                })
                .error(function() {
                  deferred.reject();
                  $state.go('login');
                });
              }
              else {
                deferred.reject();
                $state.go('login');
              }
            });
            return deferred.promise;
          }
        },
        template: '<bd-notes></bd-notes>'
      })

      .state('notes.form', {
        url: '/{noteId}',
        template: '<bd-note-form></bd-note-form>'
      });
  }

})();
