angular
  .module('meanSneakers')
  .controller('SneakerEditController', SneakerEditController);

function SneakerEditController($routeParams, SneakersFactory) {
  const vm = this;
  const sneakerId = $routeParams.sneakerId;

  SneakersFactory.getOneSneaker(sneakerId).then(function (response) {
    vm.formSneaker = response.data;
  });

  vm.updateSneaker = function () {
    if (vm.sneakerForm.$valid) {
      SneakersFactory.updateOneSneaker(sneakerId, vm.formSneaker)
        .then(function (response) {
          if (response.status === 200) {
            console.log('Successfully updated');
            location.replace('/#!/sneakers');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
}
