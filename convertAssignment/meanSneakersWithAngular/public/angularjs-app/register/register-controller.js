angular
  .module('meanSneakers')
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
        if (response.status === 200) {
          vm.message = 'Registered. Please login ';
          vm.err = '';
        } else {
          vm.err = 'Something went wrong';
        }
      });
    }
  };
}
