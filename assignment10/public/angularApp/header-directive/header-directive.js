angular.module('meanJobs').directive('mainHeader', MainHeader);

function MainHeader() {
  return {
    restrict: 'E',
    templateUrl: 'angularApp/header-directive/header.html',
  };
}
