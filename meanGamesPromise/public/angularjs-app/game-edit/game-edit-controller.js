angular
  .module('meanGames')
  .controller('GameEditController', GameEditController);

function GameEditController($routeParams, GamesFactory) {
  const vm = this;
  const gameId = $routeParams.gameId;

  GamesFactory.getOneGame(gameId).then(function (response) {
    vm.formGame = response.data;
    console.log(response.data);
  });

  vm.updateGame = function () {
    if (vm.gameForm.$valid) {
      GamesFactory.updateOneGame(gameId, vm.formGame)
        .then(function (response) {
          if (response.status === 200) {
            console.log('Successfully updated');
            location.replace('/#!/games');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
}
