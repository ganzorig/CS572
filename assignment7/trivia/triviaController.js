angular.module('openTrivia').controller('TriviaController', TriviaController);

function TriviaController($routeParams, TriviaFactory) {
  const vm = this;
  const category = $routeParams.category;

  vm.score = 10;

  vm.addChoice = function (array, item) {
    // merge incorrect and correct answer and shuffle
    let shuffled = array
      .concat(item)
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    return shuffled;
  };

  vm.decreaseScore = function () {
    vm.score--;

    if (vm.score === 0) {
      alert('Out of score');
    }
  };

  TriviaFactory.getQuestions(category).then(function (response) {
    vm.questions = response.results;
  });
}
