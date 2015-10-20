angular.module('app')
.directive('contentSection', function() {
  return {
    restrict: 'EA',
    replace: true,
    scope: {},
    controller: ContentController,
    controllerAs: 'ctrl',
    template: "\
      <section id='content' class='col-xs-6'>\
        <h2>About Me</h2>\
        <p>\
          I am Caedence. I was born on October 31, 2004. That's Halloween! My best friends are Leaffa, Makenzie, Trinity, and Morgan. My favorite colors are light blue and Rebecca purple. I love lots of T.V. shows, but if I had to pick a favorite T.V. show it would be Doctor Who. My favorite actors and actresses are Adam Sandler, David Tennant, Billie Piper, Jim Carrey, Will Ferrell, Tim Allen, Sabrina Carpenter, and Bridget Mendler. My favorite bands are Fifth Harmony, 5 Seconds of Summer, and Evanescence. My favorite sports are football and figure skating. My favorite animal in the whole wide world is micro mini pigs. I have a male ginger cat named Bill, but when we get mad at him we yell William. That is all to know about me.\
        </p>\
      </section>\
    "
  };
});

function ContentController() {

}
ContentController.$inject = [];
