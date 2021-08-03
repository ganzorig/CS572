angular.module('meanGames').controller('GamesController', GamesController);

function GamesController($location, GamesFactory, AuthFactory) {
  const vm = this;
  const count = $location.$$search && $location.$$search.count;

  GamesFactory.getAllGames(count).then(function (response) {
    vm.games = response.data;
  });

  vm.isLoggedIn = function () {
    return AuthFactory.authenticated;
  };

  vm.formGame = {};

  vm.addGame = function () {
    console.log(vm.formGame);
    if (vm.gameForm.$valid) {
      GamesFactory.addOne(vm.formGame).then(function (response) {
        if (response.status === 200) {
          vm.message = 'Successfully added a game';
        } else {
          vm.message = response.data.message;
        }
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
