const mongoose = require('mongoose');

require('dotenv').config();
require('./jobs-model');

const dbUrl = process.env.DB_URL + process.env.DB_NAME;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on('connected', function () {
  console.log('Connected to database', dbUrl);
});

mongoose.connection.on('disconnected', function () {
  console.log('DIsconnected to database');
});

mongoose.connection.on('error', function (err) {
  console.log('Error', err);
});

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('TERMINATE');
    process.exit(0);
  });
});
