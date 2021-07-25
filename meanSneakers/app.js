const express = require('express');
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

const server = app.listen(process.env.PORT, function () {
  console.log('Listening port: ', server.address().port);
});
