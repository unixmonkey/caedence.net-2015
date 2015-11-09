angular.module('notely.signup')
.service('SignupService', ['$http', 'constants', 'AuthToken', 'CurrentUser', ($http, constants, AuthToken, CurrentUser) => {

  class SignupService {
    createUser(userData) {
      return $http.post(
        constants.apiBasePath + 'users', {
          user: userData
        }
      )
      .success((response) => {
        AuthToken.set(response.auth_token);
        CurrentUser.set(response.user);
      });
    }
  }
  return new SignupService();

}]);