angular.module('meanSneakers').factory('SneakersFactory', SneakersFactory);

function SneakersFactory($http) {
  return {
    getAllSneakers,
    getOneSneaker,
    addOneSneaker,
    deleteOneSneaker,
    updateOneSneaker,
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

  function addOneSneaker(jsonSneaker) {
    return $http
      .post('/api/sneakers/', jsonSneaker)
      .then(complete)
      .catch(failed);
  }

  function deleteOneSneaker(sneakerId) {
    console.log('/api/sneakers/' + sneakerId);
    return $http
      .delete('/api/sneakers/' + sneakerId)
      .then(complete)
      .catch(failed);
  }

  function updateOneSneaker(sneakerId, jsonSneaker) {
    return $http
      .put('/api/sneakers/' + sneakerId, jsonSneaker)
      .then(complete)
      .catch(failed);
  }

  function complete(response) {
    return response;
  }

  function failed(error) {
    console.log(error);
    return error;
  }
}
