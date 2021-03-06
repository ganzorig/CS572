const express = require('express');

require('dotenv').config();
require('./api/data/db');
const router = require('./api/routes');

const app = express();

app.set('port', process.env.PORT);

app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

const server = app.listen(app.get('port'), function () {
  console.log('Listening: ' + server.address().port);
});
