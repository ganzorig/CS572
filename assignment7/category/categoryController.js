angular
  .module('openTrivia')
  .controller('CategoryController', CategoryController);

function CategoryController(TriviaFactory) {
  const vm = this;

  TriviaFactory.getCategories().then(function (response) {
    vm.categories = response.trivia_categories;
  });
}
