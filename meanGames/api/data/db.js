const mongoose = require('mongoose');

require('dotenv').config();

require('./games-model');

const dbUrl = process.env.DATABASE_URL + process.env.DATABASE_NAME;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on('connected', function () {
  console.log('Connected to ', dbUrl);
});

mongoose.connection.on('disconnected', function () {
  console.log('Disconnected');
});

mongoose.connection.on('error', function (err) {
  console.log('Error: ', err);
});

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected by app termination');
    process.exit(0);
  });
});
