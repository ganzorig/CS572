angular
  .module('meanSneakers')
  .controller('SneakersController', SneakersController);

function SneakersController($location, SneakersFactory) {
  const vm = this;
  const count = $location.$$search && $location.$$search.count;

  SneakersFactory.getAllSneakers(count).then(function (response) {
    vm.sneakers = response;
  });
}
