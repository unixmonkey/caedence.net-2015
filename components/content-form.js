angular.module('app')
.directive('contentForm', function() {
  return {
    restrict: 'EA',
    replace: true,
    scope: {},
    controller: ContentFormController,
    controllerAs: 'ctrl',
    template: "\
      <form ng-submit='ctrl.save()'>\
        <input name='title' placeholder='title' ng-model='ctrl.note.title'>\
        <textarea name='body_html' ng-model='ctrl.note.body_html'></textarea><br>\
        <button type='submit'>Save</button>\
      </form>\
    "
  };
});

function ContentFormController(StoryService) {
  this.save = function() {
    StoryService.create(this.note);
  }
}
ContentFormController.$inject = ['StoryService'];
