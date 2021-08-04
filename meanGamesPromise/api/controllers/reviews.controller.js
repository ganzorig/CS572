const mongoose = require('mongoose');

const Game = mongoose.model('Game');
const utils = require('./utils');

const _addReview = function (req, res, game) {
  const newReview = {
    name: req.body.name,
    review: req.body.review,
    date: new Date(),
  };

  game.reviews.push(newReview);

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

const _selectGame = function (req, res, game) {
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
    _addReview(req, res, game);
  } else {
    res.status(response.status).json(response.message);
  }
};

const _sendBackReviews = function (req, res, game) {
  const gameId = req.params.gameId;
  const response = { status: 200, message: {} };
  if (!game) {
    response.status = 404;
    response.message = { message: 'Game not found with ID:' + gameId };
  } else {
    response.message = game.reviews ? game.reviews : [];
  }
  res.status(response.status).json(response.message);
};

const _sendBackOneReview = function (req, res, game) {
  const gameId = req.params.gameId;
  const reviewId = req.params.reviewId;
  const response = { status: 200, message: game };
  if (!game) {
    response.status = 404;
    response.message = { message: 'Game not found with ID:' + gameId };
  } else {
    response.message = game.reviews.id(reviewId);
  }

  res.status(response.status).json(response.message);
};

module.exports.reviewGetAll = function (req, res) {
  const gameId = req.params.gameId;

  Game.findById(gameId)
    .exec()
    .then((game) => _sendBackReviews(req, res, game))
    .catch(utils._errorHandler.bind(null, res));
};

module.exports.reviewGetOne = function (req, res) {
  const gameId = req.params.gameId;

  Game.findById(gameId)
    .exec()
    .then((game) => _sendBackOneReview(req, res, game))
    .catch(utils._errorHandler.bind(null, res));
};

module.exports.reviewAdd = function (req, res) {
  const gameId = req.params.gameId;

  Game.findById(gameId)
    .select('reviews')
    .exec()
    .then((game) => _selectGame(req, res, game))
    .catch(utils._errorHandler.bind(null, res));
};

const _updateReviewProperties = function (req, game, isFullUpdate) {
  const reviewId = req.params.reviewId;
  const review = game.reviews.id(reviewId);

  review.date = new Date();

  if (isFullUpdate) {
    review.name = req.body.name;
    review.review = req.body.review;
  } else {
    if (req.body.name) {
      review.name = req.body.name;
    }
    if (req.body.review) {
      review.review = req.body.review;
    }
  }
};

const _updateReview = function (req, res, isFullUpdate) {
  const gameId = req.params.gameId;

  Game.findById(gameId)
    .select('-publisher')
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
        _updateReviewProperties(req, game, isFullUpdate);

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

module.exports.reviewFullUpdateOne = function (req, res) {
  console.log('PUT one game json');
  _updateReview(req, res, true);
};

module.exports.reviewPartialUpdateOne = function (req, res) {
  console.log('PATCH one game json');
  _updateReview(req, res, false);
};

const _deleteReview = function (req, res, game) {
  const reviewId = req.params.reviewId;
  const review = game.reviews.id(reviewId);

  review.remove();

  game
    .save()
    .then((game) => {
      res.status(204).json(game);
    })
    .catch(utils._errorHandler.bind(null, res));
};

const _reviewDelete = function (req, res, game) {
  const response = { status: 204 };
  if (!game) {
    response.status = 404;
    response.message = { message: 'Game not found given ID' };
  }
  if (response.status !== 204) {
    res.status(response.status).json(response.message);
  } else {
    _deleteReview(req, res, game);
  }
};

module.exports.reviewDelete = function (req, res) {
  console.log('DELETE one review json');
  const gameId = req.params.gameId;

  Game.findById(gameId)
    .select('-publisher')
    .exec()
    .then((game) => _reviewDelete(req, res, game))
    .catch(utils._errorHandler.bind(null, res));
};
