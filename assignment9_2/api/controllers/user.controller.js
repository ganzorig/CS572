const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

module.exports.addUser = function (req, res) {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hashedPassword) {
      const newUser = {
        username: req.body.username,
        name: req.body.name,
        password: hashedPassword,
      };

      User.create(newUser, function (err, user) {
        if (err) {
          console.log('Error acquired');
          res.status(500).json({ message: err });
        } else {
          res.status(200).json(user);
        }
      });
    });
  });
};

module.exports.login = function (req, res) {
  console.log('login called');

  const username = {
    username: req.body.username,
  };

  User.findOne(username, function (err, user) {
    if (err) {
      console.log('Error acquired');
      res.status(500).json({ message: err });
    }
    if (user) {
      console.log('User found');
      bcrypt.compare(req.body.password, user.password, function (err, same) {
        if (same) {
          // 1- payload, 2-
          const token = jwt.sign({ payload: 'test' }, process.env.PASS_PHRASE, {
            expiresIn: 3600,
          });
          res.status(200).json({ success: true, token });
        } else {
          res.status(400).json({ message: 'password incorrect' });
        }
      });
    } else {
      console.log('Username not in db');
      res.status(400).json({ message: 'unauthorized' });
    }
  });
};
