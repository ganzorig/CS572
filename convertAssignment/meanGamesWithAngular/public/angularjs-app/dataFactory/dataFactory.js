angular.module('meanGames').factory('GamesFactory', GamesFactory);

function GamesFactory($http) {
  return {
    getAllGames,
    getOneGame,
    addOne,
    updateOneGame,
    deleteOneGame,
    register,
    login,
  };

  function getAllGames(count, keyword) {
    const paramString =
      keyword && count
        ? `?search=${keyword}&count=${count}`
        : keyword
        ? `?search=${keyword}`
        : count
        ? `?count=${count}`
        : '';

    return $http
      .get('/api/games' + paramString)
      .then(complete)
      .catch(failed);
  }

  function getOneGame(gameId) {
    return $http
      .get('/api/games/' + gameId)
      .then(complete)
      .catch(failed);
  }

  function deleteOneGame(gameId) {
    return $http
      .delete('/api/games/' + gameId)
      .then(complete)
      .catch(failed);
  }

  function updateOneGame(gameId, jsonGame) {
    return $http
      .put('/api/games/' + gameId, jsonGame)
      .then(complete)
      .catch(failed);
  }

  function addOne(jsonGame) {
    return $http.post('/api/games/', jsonGame).then(complete).catch(failed);
  }

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
