const express = require('express');
const controllerGames = require('../controllers/games.controller');
const controllerPublisher = require('../controllers/publisher.controller');
const controllerReviews = require('../controllers/reviews.controller');

const router = express.Router();

router
  .route('/games')
  .get(controllerGames.gamesGetAll)
  .post(controllerGames.gamesAddOne);

router
  .route('/games/:gameId')
  .get(controllerGames.gamesGetOne)
  .put(controllerGames.gameFullUpdateOne)
  .patch(controllerGames.gamePartialUpdateOne)
  .delete(controllerGames.gameDeleteOne);

router
  .route('/games/:gameId/publisher')
  .get(controllerPublisher.publisherGetOne)
  .post(controllerPublisher.publisherAdd);

router
  .route('/games/:gameId/reviews')
  .get(controllerReviews.reviewGetOne)
  .post(controllerReviews.reviewAdd);

module.exports = router;
