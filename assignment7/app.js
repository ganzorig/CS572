angular.module('openTrivia', ['ngRoute']).config(config);

function config($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './category/category.html',
      controller: 'CategoryController',
      controllerAs: 'catCtrl',
    })
    .when('/trivia/:category', {
      templateUrl: './trivia/trivia.html',
      controller: 'TriviaController',
      controllerAs: 'triviaCtrl',
    })
    .otherwise({ redirectTo: '/' });
}
