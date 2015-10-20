angular.module('app', [])

.service('StoryService', ['$http', function($http) {
  var notes = [];
  this.all = function() {
    return notes;
  };
  this.fetch = function() {
    return $http.get('http://localhost:3000/notes/')
    .success(function(data) {
      notes = data;
    })
  };
}])

.directive('storiesNav', function() {
  return {
    restrict: 'EA',
    replace: true,
    scope: {},
    controller: StoriesNavController,
    controllerAs: 'ctrl',
    template: "\
      <navigation id='navigation' class='col-xs-3'>\
        <h2>Stories</h2>\
        <article ng-repeat=\"story in ctrl.stories track by story._id | orderBy: '-updated_at'\">\
          <h3>{{ story.title }}</h3>\
        </article>\
      </navigation>\
    "
  };
});

function StoriesNavController(StoryService) {
  var self = this;
  StoryService.fetch().then(function() {
    self.stories = StoryService.all();
  });
}
StoriesNavController.$inject = ['StoryService'];
