// external
const express = require('express');
require('dotenv').config();

// database
require('./api/data/db');

// internal
const router = require('./api/routes');

const app = express();

app.set('port', process.env.PORT);

app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use('/api', router);

const server = app.listen(app.get('port'), function () {
  console.log('Listening port: ', server.address().port);
});
