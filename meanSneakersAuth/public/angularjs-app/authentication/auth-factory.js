angular.module('meanSneakers').factory('AuthFactory', AuthFactory);

function AuthFactory() {
  let auth = false;

  return {
    authenticated: auth,
  };
}
