const express = require('express');
require('dotenv').config();

const router = require('./api/routes');
require('./api/data/dbconnection').open();

const app = express();

app.set('port', process.env.PORT);

app.use(function (req, res, next) {
  // LOG
  console.log(req.method, req.url);
  next();
});

app.use('/api', router);

const server = app.listen(app.get('port'), function () {
  console.log('Listening port: ' + server.address().port);
});
