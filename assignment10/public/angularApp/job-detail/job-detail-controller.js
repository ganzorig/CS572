angular
  .module('meanJobs')
  .controller('JobDetailController', JobDetailController);

function JobDetailController($routeParams, JobsFactory) {
  const vm = this;
  const jobId = $routeParams.jobId;

  JobsFactory.getOneJob(jobId).then(function (response) {
    vm.job = response.data;
  });
}
