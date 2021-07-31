const express = require('express');
const path = require('path');

require('./api/data/db');

require('dotenv').config();

const router = require('./api/routes');

const app = express();

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, process.env.PUBLIC_FOLDER)));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use('/api', router);

const server = app.listen(process.env.PORT, function () {
  console.log('Listen port: ', server.address().port);
});
