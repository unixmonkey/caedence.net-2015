angular.module('notely.signup')
.directive('signup', () => {
  return {
    scope: {},
    template: `
      <div class="container">
        <div class="row">
          <div class="col-xs-6 col-xs-offset-4">
            <h3>Sign up for Notely</h3>
            <form id="new_user" ng-submit="">
              <p>
                <label for="username">Username</label><br>
                <input type="text" name="username" autofocus="autofocus" ng-model="user.username">
              </p>
              <p>
                <label for="password">Password</label><br>
                <input type="password" name="password" ng-model="user.password">
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
});
