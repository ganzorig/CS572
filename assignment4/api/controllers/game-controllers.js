const mongoose = require('mongoose');
const Game = mongoose.model('Game');

// GET ALL GAME
module.exports.getAllGames = function (req, res) {
  let count = 5;
  let offset = 0;

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  Game.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, games) {
      res.status(200).json(games);
    });
};

// GET ONE GAME
module.exports.getOneGame = function (req, res) {
  const gameId = req.params.gameId;

  Game.findById(gameId).exec(function (err, game) {
    res.status(200).json(game);
  });
};
