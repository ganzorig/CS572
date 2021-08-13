module.exports._errorHandler = function (res, err) {
  res.status(500).json({ message: err });
};

module.exports._logging = function () {
  console.log('Successfully found');
};
