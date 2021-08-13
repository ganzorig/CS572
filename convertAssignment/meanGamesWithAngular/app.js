const express = require('express');
const path = require('path');

require('dotenv').config();
require('./api/data/db');
const router = require('./api/routes');
const userRouter = require('./api/routes/users');

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

app.use('/api', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  next();
});

app.use('/api', router);
app.use('/api/users', userRouter);

const server = app.listen(app.get('port'), function () {
  console.log('Listening: ' + server.address().port);
});
