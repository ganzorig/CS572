angular.module('meanSneakers').factory('UsersFactory', UsersFactory);

function UsersFactory($http) {
  return {
    register,
    login,
  };

  function register(jsonUser) {
    return $http
      .post('/api/users/register', jsonUser)
      .then(complete)
      .catch(failed);
  }

  function login(jsonUser) {
    return $http
      .post('/api/users/login', jsonUser)
      .then(complete)
      .catch(failed);
  }

  function complete(response) {
    return response;
  }

  function failed(error) {
    return error;
  }
}
