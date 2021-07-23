const express = require('express');
const path = require('path');

const router = require('./api/routes');

require('dotenv').config();

const app = express();

app.set('port', process.env.PORT);

// create routes with subset
app.use('/api', router);

app.use(express.static(path.join(__dirname, process.env.PUBLIC_FOLDER)));

const server = app.listen(app.get('port'), function () {
  console.log('Listening port: ' + server.address().port);
});
