angular.module('app')
.service('CurrentContent', [function() {
  var currentContent;
  this.get = function() {
    return currentContent;
  };
  this.set = function(newContent) {
    currentContent = newContent;
    return currentContent;
  };
}]);
