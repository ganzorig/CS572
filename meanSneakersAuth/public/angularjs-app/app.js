angular
  .module('meanSneakers', ['ngRoute', 'angular-jwt'])
  .config(config)
  .run(run);

function config($httpProvider, $routeProvider) {
  $httpProvider.interceptors.push('AuthenticationInterceptor');

  $routeProvider
    .when('/sneakers', {
      templateUrl: 'angularjs-app/sneaker-list/sneakers.html',
      controller: 'SneakersController',
      controllerAs: 'vm',
      access: {
        restricted: false,
      },
    })
    .when('/sneakers/:sneakerId', {
      templateUrl: 'angularjs-app/sneaker/sneaker.html',
      controller: 'SneakerController',
      controllerAs: 'vm',
      access: {
        restricted: false,
      },
    })
    .when('/sneakers/edit/:sneakerId', {
      templateUrl: 'angularjs-app/sneaker-edit/sneaker-edit.html',
      controller: 'SneakerEditController',
      controllerAs: 'vm',
      access: {
        restricted: true,
      },
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
