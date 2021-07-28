const express = require('express');
const path = require('path');
require('dotenv').config();

// DATABASE
require('./api/data/db');

// ROUTER MIDDLEWARE
const router = require('./api/routes');

const app = express();

// APPLICATION MIDDLEWARE
app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, process.env.PUBLIC_FOLDER)));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

const server = app.listen(process.env.PORT, function () {
  console.log('Listening port: ', server.address().port);
});
