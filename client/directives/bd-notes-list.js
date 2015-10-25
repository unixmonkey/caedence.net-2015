{
  angular.module('notely')
  .directive('bdNotesList', function() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {},
      templateUrl: '/notes/notes-list.html',
      controller: NotesListController,
      controllerAs: 'ctrl'
    };
  });
  NotesListController['$inject'] = ['notes'];
  function NotesListController(notes) {
    this.notes = notes.all();
  }
}
