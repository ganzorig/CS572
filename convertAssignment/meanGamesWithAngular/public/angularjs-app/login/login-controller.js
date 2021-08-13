angular.module('meanGames').controller('LoginController', LoginController);

function LoginController(
  UsersFactory,
  $window,
  $location,
  jwtHelper,
  AuthFactory
) {
  const vm = this;
  vm.credentials = {};

  vm.login = function () {
    UsersFactory.login(vm.credentials)
      .then(function (response) {
        vm.message = 'Logged in';
        vm.err = '';

        if (response.data.success) {
          $window.sessionStorage.token = response.data.token;

          const token = $window.sessionStorage.token;
          const decodedToken = jwtHelper.decodeToken(token);
          vm.loggedInUser = decodedToken.name;
          AuthFactory.authenticated = true;

          vm.credentials = {};
          $location.path('/');
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  vm.isLoggedIn = function () {
    return AuthFactory.authenticated;
  };

  vm.logout = function () {
    delete $window.sessionStorage.token;
    AuthFactory.authenticated = false;
    $location.path('/');
  };
}
