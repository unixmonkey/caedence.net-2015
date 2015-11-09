{

  angular.module('notely.signup', [
    'ui.router'
  ])
  .config(signupConfig);

  function signupConfig($stateProvider) {
    $stateProvider
      .state('signup', {
        url: '/signup',
        template: '<signup></signup>'
      });
  }
  signupConfig.$inject = ['$stateProvider'];

}
