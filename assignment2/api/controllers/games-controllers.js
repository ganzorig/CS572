const gameData = require('../../resources/games.json');

module.exports.getAllGame = function (req, res) {
  res.status(200).send(gameData);
};
