const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utils = require('./utils');

const User = mongoose.model('User');

const _login = function (req, res, user) {
  if (user) {
    bcrypt
      .compare(req.body.password, user.password)
      .then((same) => _signToken(res, user, same))
      .catch(utils._errorHandler.bind(null, res));
  } else {
    console.log('Username not in db');
    res.status(400).json({ message: 'Unauthorized' });
  }
};

const _signToken = function (res, user, same) {
  if (same) {
    const token = jwt.sign({ name: user.name }, process.env.PASS_PHRASE, {
      expiresIn: 3600,
    });
    res.status(200).json({ success: true, token });
  } else {
    res.status(400).json({ message: 'Password incorrect' });
  }
};

const _generateSalt = function (req, res, salt) {
  bcrypt
    .hash(req.body.password, salt)
    .then((hashedPassword) => _createUser(req, res, hashedPassword))
    .catch(utils._errorHandler.bind(null, res));
};

const _createUser = function (req, res, hashedPassword) {
  const newUser = {
    username: req.body.username,
    name: req.body.name,
    password: hashedPassword,
  };

  User.create(newUser)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(utils._errorHandler.bind(null, res));
};

module.exports.addUser = function (req, res) {
  bcrypt
    .genSalt(10)
    .then((salt) => _generateSalt(req, res, salt))
    .catch(utils._errorHandler.bind(null, res));
};

module.exports.login = function (req, res) {
  const username = {
    username: req.body.username,
  };

  User.findOne(username)
    .then((user) => _login(req, res, user))
    .catch(utils._errorHandler.bind(null, res));
};

module.exports.authenticate = function (req, res, next) {
  const headerAuth = req.headers.authorization;

  if (headerAuth) {
    const token = headerAuth.split(' ')[1];
    // jwt has no promise
    jwt.verify(token, process.env.PASS_PHRASE, function (err, decoded) {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        next();
      }
    });
  } else {
    res.status(404).json({ message: 'Token missing' });
  }
};
