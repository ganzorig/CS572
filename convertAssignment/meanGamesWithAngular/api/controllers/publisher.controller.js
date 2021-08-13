const mongoose = require('mongoose');

const Game = mongoose.model('Game');
const utils = require('./utils');

const _sendBackPublisher = function (res, game) {
  const response = { status: 200, message: {} };
  if (!game) {
    response.status = 404;
    response.message = { message: 'Game not found with given ID:' };
  } else {
    response.message = game.publisher ? game.publisher : {};
  }
  res.status(response.status).json(response.message);
};

module.exports.publisherGetOne = function (req, res) {
  const gameId = req.params.gameId;

  Game.findById(gameId)
    .exec()
    .then((game) => _sendBackPublisher(res, game))
    .catch(utils._errorHandler.bind(null, res));
};

const _addPublisher = function (req, res, game) {
  game.publisher.name = req.body.name;
  game.publisher.country = req.body.country;
  game.publisher.location = {
    type: 'Point',
    coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
  };

  game
    .save()
    .then((savedGame) => {
      const response = {
        status: 201,
        message: savedGame,
      };

      res.status(response.status).json(response.message);
    })
    .catch(utils._errorHandler.bind(null, res));
};

const _sendBackGame = function (req, res, game) {
  const gameId = req.params.gameId;
  const response = {
    status: 201,
    message: game,
  };

  if (!game) {
    console.log('Game id not found in database', id);
    response.status = 404;
    response.message = { message: 'Game ID not found' + gameId };
  }

  if (response.status === 201) {
    _addPublisher(req, res, game);
  } else {
    res.status(response.status).json(response.message);
  }
};

module.exports.publisherAdd = function (req, res) {
  Game.findById(gameId)
    .select('publisher')
    .exec()
    .then((game) => _sendBackGame(req, res, game))
    .catch(utils._errorHandler.bind(null, res));
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

const _sendBackUpdateGame = function (req, res, game, isFullUpdate) {
  const response = {
    status: 204,
    message: game,
  };

  if (!game) {
    response.status = 400;
    response.message = { message: 'Not found game with given ID' };
  }

  if (response.status !== 204) {
    res.status(response.status).json(response.message);
  } else {
    _updatePublisherProperties(req, game, isFullUpdate);

    game
      .save()
      .then(function (updateGame) {
        response.status = 200;
        response.message = updateGame;

        res.status(response.status).json(response.message);
      })
      .catch(utils._errorHandler.bind(null, res));
  }
};

const _updatePublisher = function (req, res, isFullUpdate) {
  const gameId = req.params.gameId;

  Game.findById(gameId)
    .select('-reviews')
    .exec()
    .then((game) => _sendBackUpdateGame(req, res, game, isFullUpdate))
    .catch(utils._errorHandler.bind(null, res));
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
  game
    .save()
    .then((game) => {
      const response = { status: 204, message: game };
      res.status(response.status).json(response.message);
    })
    .catch(utils._errorHandler.bind(null, res));
};

const _publisherDelete = function (req, res, game) {
  const response = { status: 204 };
  if (!game) {
    response.status = 404;
    response.message = { message: 'Game not found given ID' };
  }
  if (response.status !== 204) {
    res.status(response.status).json(response.message);
  } else {
    _deletePublisher(req, res, game);
  }
};

module.exports.publisherDelete = function (req, res) {
  console.log('DELETE one game json');
  const gameId = req.params.gameId;

  Game.findById(gameId)
    .select('-reviews')
    .exec()
    .then((game) => _publisherDelete(req, res, game))
    .catch(utils._errorHandler.bind(null, res));
};
