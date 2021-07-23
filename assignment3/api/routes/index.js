const express = require('express');
const controllerGames = require('../controllers/games-controller');

const router = express.Router();

router.route('/games').get(controllerGames.gamesGetAll);

module.exports = router;
