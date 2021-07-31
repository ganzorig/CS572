angular.module('meanJobs').factory('JobsFactory', JobsFactory);

function JobsFactory($http) {
  return {
    getAllJobs,
    deleteOneJob,
    getOneJob,
    addOneJob,
    updateOneJob,
  };

  function getAllJobs(count, keyword) {
    const paramString = keyword
      ? `?search=${keyword}`
      : count
      ? `?count=${count}`
      : keyword & count
      ? `?search=${keyword}&count=${count}`
      : '';
    return $http
      .get('api/jobs' + paramString)
      .then(complete)
      .catch(failed);
  }

  function addOneJob(jobJson) {
    return $http.post('api/jobs/', jobJson).then(complete).catch(failed);
  }

  function getOneJob(jobId) {
    return $http
      .get('api/jobs/' + jobId)
      .then(complete)
      .catch(failed);
  }

  function deleteOneJob(jobId) {
    return $http
      .delete('api/jobs/' + jobId)
      .then(complete)
      .catch(failed);
  }

  function updateOneJob(jobId, jsonJob) {
    return $http
      .put('/api/jobs/' + jobId, jsonJob)
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
