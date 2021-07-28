const mongoose = require('mongoose');

const Sneakers = mongoose.model('Sneakers');

const _addImage = function (req, res, sneaker) {
  sneaker.images.push(req.body.imageUrl);

  sneaker.save(function (err, savedSneaker) {
    const response = {
      status: 201,
      message: savedSneaker,
    };

    if (err) {
      response.status = 500;
      response.message = err;
    }

    res.status(response.status).json(response.message);
  });
};

module.exports.imagesGetAll = function (req, res) {
  const sneakerId = req.params.sneakerId;

  Sneakers.findById(sneakerId).exec(function (err, sneaker) {
    const response = { status: 200, message: {} };
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!sneaker) {
      response.status = 404;
      response.message = { message: 'Sneaker not found with ID:' + sneakerId };
    } else {
      response.message = sneaker.images;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.imagesAdd = function (req, res) {
  const sneakerId = req.params.sneakerId;

  Sneakers.findById(sneakerId)
    .select('images')
    .exec(function (err, sneaker) {
      const response = {
        status: 201,
        message: sneaker,
      };

      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!sneaker) {
        response.status = 404;
        response.message = {
          message: 'Sneaker not found with id: ' + sneakerId,
        };
      }

      if (response.status === 201) {
        _addImage(req, res, sneaker);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

const _deleteImages = function (req, res, sneaker) {
  sneaker.images = [];
  sneaker.save(function (err, sneaker) {
    const response = { status: 204, message: sneaker };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.imagesDelete = function (req, res) {
  console.log('DELETE all images');
  const sneakerId = req.params.sneakerId;

  Sneakers.findById(sneakerId)
    .select('-reviews')
    .exec(function (err, sneaker) {
      const response = { status: 204 };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!sneaker) {
        response.status = 404;
        response.message = { message: 'Sneaker not found given ID' };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        _deleteImages(req, res, sneaker);
      }
    });
};
