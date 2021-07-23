module.exports.calculate = function (req, res) {
  const number1 = parseInt(req.params.numberOne);

  let number2 = 0;

  if (req.query && req.query.numberTwo) {
    number2 = parseInt(req.query.numberTwo, 10);
  }

  res.status(200).send({
    number1,
    number2,
    operator: '+',
    result: number1 + number2,
  });
};
