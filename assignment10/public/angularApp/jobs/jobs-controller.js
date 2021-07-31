angular.module('meanJobs').controller('JobsController', JobsController);

function JobsController($location, JobsFactory, $window) {
  const vm = this;
  const count = $location.$$search && $location.$$search.count;

  JobsFactory.getAllJobs(count).then(function (response) {
    vm.jobs = response.data;
  });

  vm.search = {};

  vm.search = function () {
    JobsFactory.getAllJobs(count, vm.search.keyword).then(function (response) {
      vm.jobs = response.data;
    });
  };

  vm.deleteJob = function (jobId) {
    if ($window.confirm('Do you really want to delete?')) {
      JobsFactory.deleteOneJob(jobId)
        .then(function (response) {
          if (response.status === 204) {
            console.log('Successfully deleted');
            location.reload();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  vm.formJob = {};

  vm.addJob = function () {
    if (vm.jobForm.$valid) {
      JobsFactory.addOneJob(vm.formJob)
        .then(function (response) {
          if (response.status === 200) {
            $location.replace('/#!/jobs');
            location.reload();
            console.log('Successfully added');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
}
