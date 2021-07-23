const dbConnection = require('../data/dbconnection');

module.exports.gamesGetAll = function (req, res) {
  let count = 5;
  let offset = 0;

  if (req.query && req.query.count) {
    const requestedCount = parseInt(req.query.count, 10);
    const limit = 7;

    count = requestedCount > limit ? limit : requestedCount;
  }

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  const db = dbConnection.get();
  const collection = db.collection('games');

  collection
    .find()
    .skip(offset)
    .limit(count)
    .toArray(function (err, games) {
      console.log('Game count: ', games.length);
      res.status(200).send(games);
    });
};
