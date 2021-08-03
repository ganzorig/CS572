const mongoose = require('mongoose');

const Game = mongoose.model('Game');

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

const _updatePublisherProperties = function (req, game, isFullUpdate) {
  if (isFullUpdate) {
    game.publisher.name = req.body.name;
    game.publisher.country = req.body.country;
    game.publisher.location.coordinates = [
      parseFloat(req.body.lng),
      parseFloat(req.body.lat),
    ];
  } else {
    if (req.body.name) {
      game.publisher.name = req.body.name;
    }
    if (req.body.country) {
      game.publisher.country = req.body.country;
    }
    if (req.body.lng && req.body.lat) {
      game.publisher.location.coordinates = [
        parseFloat(req.body.lng),
        parseFloat(req.body.lat),
      ];
    }
  }
};

const _updatePublisher = function (req, res, isFullUpdate) {
  const gameId = req.params.gameId;

  Game.findById(gameId)
    .select('-reviews')
    .exec(function (err, game) {
      const response = {
        status: 204,
        message: game,
      };

      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!game) {
        response.status = 400;
        response.message = { message: 'Not found game with given ID' };
      }

      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        _updatePublisherProperties(req, game, isFullUpdate);

        game.save(function (err, updateGame) {
          if (err) {
            response.status = 500;
            response.message = err;
          } else {
            response.status = 200;
            response.message = updateGame;
          }

          res.status(response.status).json(response.message);
        });
      }
    });
};

module.exports.publisherFullUpdateOne = function (req, res) {
  console.log('PUT one game json');
  _updatePublisher(req, res, true);
};

module.exports.publisherPartialUpdateOne = function (req, res) {
  console.log('PATCH one game json');
  _updatePublisher(req, res, false);
};

const _deletePublisher = function (req, res, game) {
  game.publisher.remove();
  game.save(function (err, game) {
    const response = { status: 204, message: game };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.publisherDelete = function (req, res) {
  console.log('DELETE one game json');
  const gameId = req.params.gameId;

  Game.findById(gameId)
    .select('-reviews')
    .exec(function (err, game) {
      const response = { status: 204 };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!game) {
        response.status = 404;
        response.message = { message: 'Game not found given ID' };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        _deletePublisher(req, res, game);
      }
    });
};
