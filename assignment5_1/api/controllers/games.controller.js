const mongoose = require('mongoose');
const Game = mongoose.model('Game');

module.exports.gamesGetAll = function (req, res) {
  console.log('GET all games json');
  const response = {};

  let count = 5;
  let offset = 0;

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (isNaN(count) || isNaN(offset)) {
    response.status = 400;
    response.message = { message: 'Offset and Count values should be numbers' };
  }

  Game.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, games) {
      if (err) {
        response.status = 500;
        response.message = err;
      } else {
        response.status = 200;
        response.message = games;
      }

      res.status(response.status).json(response.message);
    });
};

module.exports.gamesGetOne = function (req, res) {
  console.log('GET one game json');

  const gameId = req.params.gameId;

  Game.findById(gameId).exec(function (err, game) {
    const response = {
      status: 200,
      message: game,
    };

    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!game) {
      response.status = 400;
      response.message = { message: 'Game not found given ID' };
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.gamesAddOne = function (req, res) {
  console.log('POST add new game');

  const newGame = {
    title: req.body.title,
    year: parseInt(req.body.year),
    rate: parseInt(req.body.rate),
    minPlayers: parseInt(req.body.minPlayers),
    maxPlayers: parseInt(req.body.maxPlayers),
    minAge: parseInt(req.body.minAge),
    price: parseFloat(req.body.price),
    designers: [req.body.designer],
  };

  Game.create(newGame, function (err, createResponse) {
    const response = {
      status: 200,
      message: createResponse,
    };

    if (err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

const _updateGameProperties = function (req, game, isFullUpdate) {
  if (isFullUpdate) {
    game.title = req.body.title;
    game.year = parseInt(req.body.year);
    game.rate = parseInt(req.body.rate);
    game.minPlayers = parseInt(req.body.minPlayers);
    game.maxPlayers = parseInt(req.body.maxPlayers);
    game.minAge = parseInt(req.body.minAge);
    game.price = parseFloat(req.body.price);
    game.designers = [req.body.designer];
  } else {
    if (req.body.title) {
      game.title = req.body.title;
    }
    if (req.body.year) {
      game.year = parseInt(req.body.year);
    }
    if (req.body.rate) {
      game.rate = parseInt(req.body.rate);
    }
    if (req.body.price) {
      game.price = parseFloat(req.body.price);
    }
    if (req.body.minPlayers) {
      game.minPlayers = parseInt(req.body.minPlayers);
    }
    if (req.body.maxPlayers) {
      game.maxPlayers = parseInt(req.body.maxPlayers);
    }
    if (req.body.minAge) {
      game.minAge = parseFloat(req.body.minAge);
    }
    if (req.body.designer) {
      game.designers = [req.body.designer];
    }
  }
};

const _updateGame = function (req, res, isFullUpdate) {
  const gameId = req.params.gameId;

  Game.findById(gameId).exec(function (err, game) {
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
      _updateGameProperties(req, game, isFullUpdate);

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

module.exports.gameFullUpdateOne = function (req, res) {
  console.log('PUT one game json');
  _updateGame(req, res, true);
};

module.exports.gamePartialUpdateOne = function (req, res) {
  console.log('PATCH one game json');
  _updateGame(req, res, false);
};

module.exports.gameDeleteOne = function (req, res) {
  console.log('DELETE one game json');
  const gameId = req.params.gameId;

  Game.findByIdAndDelete(gameId).exec(function (err, deletedGame) {
    const response = { status: 204 };
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!deletedGame) {
      response.status = 404;
      response.message = { message: 'Game not found given ID' };
    }
    res.status(response.status).json(response.message);
  });
};
