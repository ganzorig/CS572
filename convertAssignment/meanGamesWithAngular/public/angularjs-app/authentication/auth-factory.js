angular.module('meanGames').factory('AuthFactory', AuthFactory);

function AuthFactory() {
  let auth = false;

  return {
    authenticated: auth,
  };
}
