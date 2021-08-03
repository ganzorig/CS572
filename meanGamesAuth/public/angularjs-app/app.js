angular.module('meanGames', ['ngRoute', 'angular-jwt']).config(config).run(run);

function config($httpProvider, $routeProvider) {
  $httpProvider.interceptors.push('AuthenticationInterceptor');

  $routeProvider
    .when('/games', {
      templateUrl: 'angularjs-app/game-list/games.html',
      controller: 'GamesController',
      controllerAs: 'vm',
      access: {
        restricted: false,
      },
    })
    .when('/games/:gameId', {
      templateUrl: 'angularjs-app/game/game.html',
      controller: 'GameController',
      controllerAs: 'vm',
      access: {
        restricted: false,
      },
    })
    .when('/games/edit/:gameId', {
      templateUrl: 'angularjs-app/game-edit/game-edit.html',
      controller: 'GameEditController',
      controllerAs: 'vm',
    })
    .when('/register', {
      templateUrl: 'angularjs-app/register/register.html',
      controller: 'RegisterController',
      controllerAs: 'vm',
      access: {
        restricted: false,
      },
    })
    .when('/welcome', {
      templateUrl: 'angularjs-app/welcome/welcome.html',
    })
    .when('/profile', {
      templateUrl: 'angularjs-app/profile/profile.html',
      access: {
        restricted: true,
      },
    })
    .otherwise({ redirectTo: '/welcome' });
}

function run($rootScope, $location, $window, AuthFactory) {
  $rootScope.$on('$routeChangeStart', function (event, nextRoute) {
    if (
      nextRoute.access !== undefined &&
      nextRoute.access.restricted &&
      !$window.sessionStorage.token &&
      !AuthFactory.authenticated
    ) {
      event.preventDefault();
      $location.path('/');
    }
  });
}
