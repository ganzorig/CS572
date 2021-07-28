angular.module('meanGames').controller('GameController', GameController);

function _getStarsArray(stars) {
  return new Array(stars);
}

function GameController($routeParams, GamesFactory) {
  const vm = this;
  const gameId = $routeParams.gameId;

  GamesFactory.getOneGame(gameId).then(function (response) {
    vm.game = response;
    vm.rating = _getStarsArray(vm.game.rate);
  });
}
