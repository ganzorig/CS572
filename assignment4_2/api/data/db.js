const mongoose = require('mongoose');
require('dotenv').config();

require('./student-model');

const dbUrl = process.env.DATABASE_URL + process.env.DATABASE_NAME;

// connect to database
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on('connected', function () {
  console.log('CONNECTED: ', dbUrl);
});

mongoose.connection.on('disconnected', function () {
  console.log('DISCONNECTED');
});

mongoose.connection.on('error', function (err) {
  console.log('ERROR', err);
});

// listen app termination
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('MONGOOSE DISCONNECTED');
    process.exit(0);
  });
});
