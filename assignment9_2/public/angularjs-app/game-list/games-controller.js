angular.module('meanGames').controller('GamesController', GamesController);

function GamesController($location, GamesFactory) {
  const vm = this;
  const count = $location.$$search && $location.$$search.count;

  GamesFactory.getAllGames(count).then(function (response) {
    vm.games = response.data;
  });

  vm.formGame = {};

  vm.addGame = function () {
    if (vm.gameForm.$valid) {
      console.log(vm.formGame);
      GamesFactory.addOne(vm.formGame)
        .then(function (response) {
          if (response.status === 200) {
            location.reload();
            console.log('Successfully added');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  vm.deleteGame = function (gameId) {
    if (window.confirm('Do you really want to delete?')) {
      GamesFactory.deleteOneGame(gameId)
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
