angular
  .module('meanJobs')
  .controller('JobDetailController', JobDetailController);

function JobDetailController($routeParams, JobsFactory, ReviewsFactory) {
  const vm = this;
  const jobId = $routeParams.jobId;

  JobsFactory.getOneJob(jobId).then(function (response) {
    vm.job = response.data;
  });

  vm.formReview = {};

  vm.addReview = function () {
    console.log(vm.formReview);
    if (vm.reviewForm.$valid) {
      ReviewsFactory.addReview(jobId, vm.formReview)
        .then(function (response) {
          if (response.status === 201) {
            location.reload();
            console.log('Successfully added review');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
}
