const mongoose = require('mongoose');

const Game = mongoose.model('Game');

const _addReview = function (req, res, game) {
  const newReview = {
    name: req.body.name,
    review: req.body.review,
    date: new Date(),
  };

  console.log(game.reviews);
  game.reviews.push(newReview);

  game.save(function (err, savedGame) {
    const response = {
      status: 201,
      message: savedGame,
    };

    if (err) {
      response.status = 500;
      response.message = err;
    }

    res.status(response.status).json(response.message);
  });
};

module.exports.reviewGetOne = function (req, res) {
  const gameId = req.params.gameId;

  Game.findById(gameId).exec(function (err, game) {
    const response = { status: 200, message: {} };
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!game) {
      response.status = 404;
      response.message = { message: 'Game not found with ID:' + gameId };
    } else {
      response.message = game.reviews ? game.reviews : [];
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.reviewAdd = function (req, res) {
  const gameId = req.params.gameId;

  Game.findById(gameId)
    .select('reviews')
    .exec(function (err, game) {
      const response = {
        status: 201,
        message: game,
      };

      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!game) {
        console.log('Game id not found in database', id);
        response.status = 404;
        response.message = { message: 'Game ID not found' + gameId };
      }

      if (response.status === 201) {
        _addReview(req, res, game);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};
