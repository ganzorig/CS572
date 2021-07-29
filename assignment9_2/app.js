const express = require('express');
const path = require('path');

require('dotenv').config();
require('./api/data/db');
const router = require('./api/routes');

const app = express();

app.set('port', process.env.PORT);

app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, process.env.PUBLIC_FOLDER)));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

const server = app.listen(app.get('port'), function () {
  console.log('Listening: ' + server.address().port);
});
