import '../signup/signup-service'

angular.module('notely.signup')
.directive('signup', ['$state', 'SignupService', ($state, SignupService) => {

  class SignupController {
    constructor() {
      this.user = {};
    }
    submit() {
      SignupService.createUser(this.user)
      .success((response) => {
        $state.go('notes.form');
      })
    }
  }

  return {
    scope: {},
    controller: SignupController,
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
      <div class="container">
        <div class="row">
          <div class="col-xs-6 col-xs-offset-4">
            <h3>Sign up for Notely</h3>
            <form id="new_user" ng-submit="ctrl.submit()">
              <p>
                <label for="name">Full Name</label><br>
                <input type="text" name="name" autofocus="autofocus" ng-model="ctrl.user.name">
              </p>
              <p>
                <label for="username">Username</label><br>
                <input type="text" name="username" ng-model="ctrl.user.username">
              </p>
              <p>
                <label for="password">Password</label><br>
                <input type="password" name="password" ng-model="ctrl.user.password">
              </p>
              <input type="submit" name="commit" value="Sign Up" class="btn btn-default">
              <span class="login">
                Already have an account?
                <a ui-sref="login">Log in.</a>
              </span>
            </form>
          </div>
        </div>
      </div>
    `
  };
}]);
