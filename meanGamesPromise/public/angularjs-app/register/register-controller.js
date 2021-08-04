angular
  .module('meanGames')
  .controller('RegisterController', RegisterController);

function RegisterController(UsersFactory) {
  const vm = this;
  vm.user = {};

  vm.register = function () {
    vm.err = '';
    vm.message = '';
    if (vm.user.password !== vm.user.repeatPassword) {
      vm.err = 'Password did not match';
    } else {
      UsersFactory.register(vm.user).then(function (response) {
        console.log(response);
        if (response.status === 200) {
          vm.message = 'Registered. Please login ';
          vm.err = '';
        } else {
          vm.message = 'Something went wrong';
        }
      });
    }
  };
}
