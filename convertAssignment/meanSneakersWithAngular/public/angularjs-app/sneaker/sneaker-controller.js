angular
  .module('meanSneakers')
  .controller('SneakerController', SneakerController);

function _getStarsArray(stars) {
  return new Array(stars);
}

function SneakerController($routeParams, SneakersFactory) {
  const vm = this;
  const sneakerId = $routeParams.sneakerId;
  vm.getStars = _getStarsArray;

  SneakersFactory.getOneSneaker(sneakerId).then(function (response) {
    vm.sneaker = response.data;
  });
}
