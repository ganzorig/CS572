const express = require('express');
const gameController = require('../controllers/game-controllers');

const router = express.Router();

// endpoints
router.route('/games').get(gameController.getAllGames);
router.route('/games/:gameId').get(gameController.getOneGame);

module.exports = router;
