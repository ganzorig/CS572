angular.module('meanGames').factory('GamesFactory', GamesFactory);

function GamesFactory($http) {
  return {
    getAllGames,
    getOneGame,
  };

  function getAllGames(count) {
    const paramString = count ? `?count=${count}` : '';
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

  function complete(response) {
    return response.data;
  }

  function failed(error) {
    return error;
  }
}
