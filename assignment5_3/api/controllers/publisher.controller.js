const mongoose = require('mongoose');

const Game = mongoose.model('Game');

const _addPublisher = function (req, res, game) {
  game.publisher.name = req.body.name;
  game.publisher.country = req.body.country;
  game.publisher.location = {
    type: 'Point',
    coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
  };

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

module.exports.publisherGetOne = function (req, res) {
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
      response.message = game.publisher ? game.publisher : {};
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.publisherAdd = function (req, res) {
  const gameId = req.params.gameId;

  Game.findById(gameId)
    .select('publisher')
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
        _addPublisher(req, res, game);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};
