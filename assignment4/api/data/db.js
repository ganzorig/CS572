const mongoose = require('mongoose');
require('dotenv').config();

require('./game-model');

const dbUrl = process.env.DATABASE_URL + process.env.DATABASE_NAME;

// connect database using new parser and monitoring engine
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on('connected', function () {
  console.log('CONNECTED TO DATABASE: ', dbUrl);
});

mongoose.connection.on('disconnected', function () {
  console.log('DISCONNECTED FROM DATABASE');
});

mongoose.connection.on('error', function (err) {
  console.log('ERROR', err);
});

// listen app termination
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('MONGOOSE DISCONNECTED BY APP TERMINATION');
    process.exit(0);
  });
});
