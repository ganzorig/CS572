angular.module('meanSneakers').factory('SneakersFactory', SneakersFactory);

function SneakersFactory($http) {
  return {
    getAllSneakers,
    getOneSneaker,
  };

  function getAllSneakers(count) {
    const paramString = count ? `?count=${count}` : '';
    return $http
      .get('/api/sneakers' + paramString)
      .then(complete)
      .catch(failed);
  }

  function getOneSneaker(sneakerId) {
    return $http
      .get('/api/sneakers/' + sneakerId)
      .then(complete)
      .catch(failed);
  }

  function complete(response) {
    return response.data;
  }

  function failed(error) {
    return error;
  }
}
