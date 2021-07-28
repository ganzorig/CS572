angular.module('meanGames').controller('GamesController', GamesController);

function GamesController($location, GamesFactory) {
  const vm = this;
  const count = $location.$$search && $location.$$search.count;

  GamesFactory.getAllGames(count).then(function (response) {
    vm.games = response;
  });
}
