angular
  .module('meanSneakers')
  .controller('SneakersController', SneakersController);

function SneakersController($location, SneakersFactory) {
  const vm = this;
  const count = $location.$$search && $location.$$search.count;

  SneakersFactory.getAllSneakers(count).then(function (response) {
    vm.sneakers = response.data;
  });

  vm.formSneaker = {};

  vm.addSneaker = function () {
    if (vm.sneakerForm.$valid) {
      SneakersFactory.addOneSneaker(vm.formSneaker)
        .then(function (response) {
          if (response.status === 200) {
            location.replace('/#!/sneakers?count=0');
            location.reload();
            console.log('Successfully added');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  vm.deleteSneaker = function (sneakerId) {
    if (window.confirm('Do you really want to delete?')) {
      SneakersFactory.deleteOneSneaker(sneakerId)
        .then(function (response) {
          if (response.status === 204) {
            console.log('Successfully deleted');
            location.reload();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
}
