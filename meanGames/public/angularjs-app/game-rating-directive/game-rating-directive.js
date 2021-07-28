angular.module('meanGames').directive('gameRating', GameRating);

function GameRating() {
  return {
    restrict: 'E',
    templateUrl: 'angularjs-app/game-rating-directive/rating.html',
    bindToController: true,
    controller: 'GameController',
    controllerAs: 'vm',
  };
}
