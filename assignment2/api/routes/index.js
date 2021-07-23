const express = require('express');

const gameController = require('../controllers/games-controllers');
const calcController = require('../controllers/calculator-controller');

const router = express.Router();

router.route('/games').get(gameController.getAllGame);

router.route('/calculator/:numberOne').get(calcController.calculate);

module.exports = router;
