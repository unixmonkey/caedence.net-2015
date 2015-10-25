angular.module('notely')
.directive('bdNotes', () => {
  return {
    scope: {},
    template: `
      <div class="container">
        <div class="row">
          <div class="col-xs-4">
            <bd-notes-list></bd-notes-list>
          </div>
          <div class="col-xs-8">
            <main>
              <div ui-view></div>
            </main>
          </div>
        </div>
      </div>
    `
  };
});
