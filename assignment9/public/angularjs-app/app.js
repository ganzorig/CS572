angular.module('meanSneakers', ['ngRoute']).config(config);

function config($routeProvider) {
  $routeProvider
    .when('/sneakers', {
      templateUrl: 'angularjs-app/sneaker-list/sneakers.html',
      controller: 'SneakersController',
      controllerAs: 'vm',
    })
    .when('/sneakers/:sneakerId', {
      templateUrl: 'angularjs-app/sneaker/sneaker.html',
      controller: 'SneakerController',
      controllerAs: 'vm',
    })
    .when('/sneakers/edit/:sneakerId', {
      templateUrl: 'angularjs-app/sneaker-edit/sneaker-edit.html',
      controller: 'SneakerEditController',
      controllerAs: 'vm',
    })
    .otherwise({ redirectTo: '/sneakers' });
}
