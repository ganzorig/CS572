angular.module('meanGames').directive('mainHeader', MainHeader);

function MainHeader() {
  return {
    restrict: 'E',
    templateUrl: 'angularjs-app/header-directive/header.html',
  };
}
