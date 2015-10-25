{
  angular.module('notely')
  .directive('bdUserLinks', () => {
    return {
      scope: {},
      controller: UserLinksController,
      controllerAs: 'ctrl',
      bindToController: true,
      template: `
      <div class="user-links">
        <div ng-show="ctrl.user().id">
          Signed in as {{ ctrl.user().name }}
          |
          <a ng-click="ctrl.logout()">Logout</a>
        </div>
      </div>`
    };
  });

  class UserLinksController {

    constructor($state, login, CurrentUser) {
      this.$state = $state;
      this.login = login;
      this.CurrentUser = CurrentUser;
      this.really = 'Yes, really.';
    }

    user() {
      return this.CurrentUser.get();
    }

    logout() {
      this.login.logout();
      this.$state.go('login');
    }
  }
  UserLinksController.$inject = ['$state', 'login', 'CurrentUser'];
}
