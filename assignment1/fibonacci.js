const fib = function (number) {
  if (number < 0) {
    return 0;
  }
  if (number <= 2) {
    return 1;
  }
  return fib(number - 1) + fib(number - 2);
};

module.exports.calc = fib;
