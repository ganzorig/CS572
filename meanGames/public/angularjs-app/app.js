angular.module('meanGames', ['ngRoute']).config(config);

function config($routeProvider) {
  $routeProvider
    .when('/games', {
      templateUrl: 'angularjs-app/game-list/games.html',
      controller: 'GamesController',
      controllerAs: 'vm',
    })
    .when('/games/:gameId', {
      templateUrl: 'angularjs-app/game/game.html',
      controller: 'GameController',
      controllerAs: 'vm',
    })
    .otherwise({ redirectTo: '/games' });
}
