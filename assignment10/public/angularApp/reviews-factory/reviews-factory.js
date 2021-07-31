angular.module('meanJobs').factory('ReviewsFactory', ReviewsFactory);

function ReviewsFactory($http) {
  return {
    addReview,
  };

  function addReview(jobId, reviewJson) {
    return $http
      .post('api/jobs/' + jobId + '/reviews', reviewJson)
      .then(complete)
      .catch(failed);
  }

  function failed(err) {
    console.log('error', err);
    return err;
  }

  function complete(response) {
    return response;
  }
}
