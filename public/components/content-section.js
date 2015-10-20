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
        <h2 ng-bind='ctrl.title()'></h2>\
        <p ng-bind-html='ctrl.body_html()'></p>\
        <p>\
          \
        </p>\
      </section>\
    "
  };
});

function ContentController(CurrentContent, $sce) {
  this.defaultContent = "I am Caedence. I was born on October 31, 2004. That's Halloween! My best friends are Leaffa, Makenzie, Trinity, and Morgan. My favorite colors are light blue and Rebecca purple. I love lots of T.V. shows, but if I had to pick a favorite T.V. show it would be Doctor Who. My favorite actors and actresses are Adam Sandler, David Tennant, Billie Piper, Jim Carrey, Will Ferrell, Tim Allen, Sabrina Carpenter, and Bridget Mendler. My favorite bands are Fifth Harmony, 5 Seconds of Summer, and Evanescence. My favorite sports are football and figure skating. My favorite animal in the whole wide world is micro mini pigs. I have a male ginger cat named Bill, but when we get mad at him we yell William. That is all to know about me.";
  this.defaultTitle = "About Me";
  this.content = function() {
    return CurrentContent.get();
  }
  this.title = function() {
    if (this.content()) {
      return this.content().title;
    } else {
      return this.defaultTitle;
    }
  }
  this.body_html = function() {
    if (this.content()) {
      return $sce.trustAsHtml(this.content().body_html);
    } else {
      return $sce.trustAsHtml(this.defaultContent);
    }
  }
}
ContentController.$inject = ['CurrentContent', '$sce'];
