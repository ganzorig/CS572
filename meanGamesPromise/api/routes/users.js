const express = require('express');
const controllerUsers = require('../controllers/user.controller');

const router = express.Router();

router.route('/register').post(controllerUsers.addUser);

router.route('/login').post(controllerUsers.login);

module.exports = router;
