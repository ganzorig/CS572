require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;

const dbName = process.env.DATABASE_NAME;
const dbUrl = process.env.DATABASE_URL + dbName;

let _connection = null;

const open = function () {
  MongoClient.connect(dbUrl, function (err, client) {
    if (err) {
      console.log('DB connection failed', err);
      return;
    }

    _connection = client.db(dbName);
  });
};

const get = function () {
  return _connection;
};

module.exports = {
  open,
  get,
};
