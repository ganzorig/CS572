const mongoose = require('mongoose');

const Sneakers = mongoose.model('Sneakers');

module.exports.sneakersGetAll = function (req, res) {
  console.log('GET all sneakers');
  const response = {};

  let count = 5;
  let offset = 0;

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (isNaN(count) || isNaN(offset)) {
    response.status = 400;
    response.message = { message: 'Offset and Count values should be numbers' };
  }

  Sneakers.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, sneakers) {
      if (err) {
        response.status = 500;
        response.message = err;
      } else {
        response.status = 200;
        response.message = sneakers;
      }

      res.status(response.status).json(response.message);
    });
};

module.exports.sneakersGetOne = function (req, res) {
  console.log('GET one sneaker');

  const sneakerId = req.params.sneakerId;

  Sneakers.findById(sneakerId).exec(function (err, sneaker) {
    const response = {
      status: 200,
      message: sneaker,
    };

    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!sneaker) {
      response.status = 400;
      response.message = { message: 'Sneakers not found given ID' };
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.sneakersAddOne = function (req, res) {
  console.log('POST add new sneaker');

  const newSneakers = {
    name: req.body.name,
    brand: req.body.brand,
    description: req.body.description,
    color: req.body.color,
    releaseYear: parseInt(req.body.releaseYear),
    usSize: parseFloat(req.body.usSize),
    gender: req.body.gender,
    price: parseFloat(req.body.price),
  };

  Sneakers.create(newSneakers, function (err, createResponse) {
    const response = {
      status: 200,
      message: createResponse,
    };

    if (err) {
      response.status = 500;
      response.message = err;
    }

    res.status(response.status).json(response.message);
  });
};

const _updateSneakersProperties = function (req, sneaker, isFullUpdate) {
  if (isFullUpdate) {
    sneaker.name = req.body.name;
    sneaker.brand = req.body.brand;
    sneaker.description = req.body.description;
    sneaker.color = req.body.color;
    sneaker.releaseYear = parseInt(req.body.releaseYear);
    sneaker.usSize = parseFloat(req.body.usSize);
    sneaker.gender = req.body.gender;
    sneaker.price = parseFloat(req.body.price);
  } else {
    if (req.body.name) {
      sneaker.name = req.body.name;
    }
    if (req.body.brand) {
      sneaker.brand = req.body.brand;
    }
    if (req.body.description) {
      sneaker.description = req.body.description;
    }
    if (req.body.color) {
      sneaker.color = req.body.color;
    }
    if (req.body.releaseYear) {
      sneaker.releaseYear = parseInt(req.body.releaseYear);
    }
    if (req.body.usSize) {
      sneaker.usSize = parseFloat(req.body.usSize);
    }
    if (req.body.gender) {
      sneaker.gender = req.body.gender;
    }
    if (req.body.price) {
      sneaker.price = parseFloat(req.body.price);
    }
  }
};

const _updateSneakers = function (req, res, isFullUpdate) {
  const sneakerId = req.params.sneakerId;

  Sneakers.findById(sneakerId)
    .select('-reviews -images')
    .exec(function (err, sneaker) {
      const response = {
        status: 204,
        message: sneaker,
      };

      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!sneaker) {
        response.status = 400;
        response.message = { message: 'Not found sneaker with given ID' };
      }

      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        _updateSneakersProperties(req, sneaker, isFullUpdate);

        sneaker.save(function (err, updateSneaker) {
          if (err) {
            response.status = 500;
            response.message = err;
          } else {
            response.status = 200;
            response.message = updateSneaker;
          }

          res.status(response.status).json(response.message);
        });
      }
    });
};

module.exports.sneakerFullUpdateOne = function (req, res) {
  console.log('PUT one sneaker');
  _updateSneakers(req, res, true);
};

module.exports.sneakerPartialUpdateOne = function (req, res) {
  console.log('PATCH one sneaker');
  _updateSneakers(req, res, false);
};

module.exports.sneakerDeleteOne = function (req, res) {
  console.log('DELETE one sneaker');
  const sneakerId = req.params.sneakerId;

  Sneakers.findByIdAndDelete(sneakerId).exec(function (err, deletedSneaker) {
    const response = { status: 204 };
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!deletedSneaker) {
      response.status = 404;
      response.message = { message: 'Sneaker not found given ID' };
    }
    res.status(response.status).json(response.message);
  });
};
