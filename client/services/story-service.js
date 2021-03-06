angular.module('app')
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
  this.create = function(noteData) {
    return $http.post('http://localhost:3000/notes/', noteData)
    .success(function(data) {
      notes.unshift(data.note);
    });
  };
}]);
