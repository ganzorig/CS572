angular.module('openTrivia').factory('TriviaFactory', TriviaFactory);

function TriviaFactory($http) {
  return {
    getCategories,
    getQuestions: getQuestionsByCategory,
  };
  function getCategories() {
    return $http
      .get('https://opentdb.com/api_category.php')
      .then(complete)
      .catch(failed);
  }
  function getQuestionsByCategory(category) {
    return $http
      .get('https://opentdb.com/api.php?amount=10&category=' + category)
      .then(complete)
      .catch(failed);
  }
  function complete(response) {
    return response.data;
  }
  function failed(error) {
    return error.statusText;
  }
}
