angular.module('meanJobs', ['ngRoute']).config(config);

function config($routeProvider) {
  $routeProvider
    .when('/jobs', {
      templateUrl: 'angularApp/jobs/jobs.html',
      controller: 'JobsController',
      controllerAs: 'vm',
    })
    .when('/jobs/:jobId', {
      templateUrl: 'angularApp/job-detail/job-detail.html',
      controller: 'JobDetailController',
      controllerAs: 'vm',
    })
    .when('/jobs/edit/:jobId', {
      templateUrl: 'angularApp/job-edit/job-edit.html',
      controller: 'JobEditController',
      controllerAs: 'vm',
    });
}
