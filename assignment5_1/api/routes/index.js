const express = require('express');
const controllerGames = require('../controllers/games.controller');

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

module.exports = router;
