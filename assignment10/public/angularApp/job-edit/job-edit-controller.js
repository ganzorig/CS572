angular.module('meanJobs').controller('JobEditController', JobEditController);

function JobEditController($routeParams, JobsFactory) {
  const vm = this;
  const jobId = $routeParams.jobId;

  JobsFactory.getOneJob(jobId).then(function (response) {
    vm.formJob = response.data;

    vm.locationForm = {
      country: vm.formJob.location.country,
      lng: vm.formJob.location.coordinates[0],
      lat: vm.formJob.location.coordinates[1],
    };
  });

  vm.updateJob = function () {
    if (vm.jobForm.$valid) {
      console.log(vm.formJob);
      JobsFactory.updateOneJob(jobId, vm.formJob)
        .then(function (response) {
          if (response.status === 200) {
            console.log('Successfully updated');
            location.replace('/#!/jobs');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
}
