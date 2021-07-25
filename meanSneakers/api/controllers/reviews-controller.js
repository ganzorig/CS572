const mongoose = require('mongoose');

const Sneakers = mongoose.model('Sneakers');

const _addReview = function (req, res, sneaker) {
  const newReview = {
    title: req.body.title,
    review: req.body.review,
    rate: parseInt(req.body.rate),
    date: new Date(),
  };

  sneaker.reviews.push(newReview);

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

module.exports.reviewGetAll = function (req, res) {
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
      response.message = sneaker.reviews ? sneaker.reviews : [];
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.reviewGetOne = function (req, res) {
  const sneakerId = req.params.sneakerId;
  const reviewId = req.params.reviewId;

  Sneakers.findById(sneakerId).exec(function (err, sneaker) {
    const response = { status: 200, message: sneaker };
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!sneaker) {
      response.status = 404;
      response.message = { message: 'Sneaker not found with ID:' + sneakerId };
    } else {
      response.message = sneaker.reviews.id(reviewId);
    }

    res.status(response.status).json(response.message);
  });
};

module.exports.reviewAdd = function (req, res) {
  const sneakerId = req.params.sneakerId;

  Sneakers.findById(sneakerId)
    .select('reviews')
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
        _addReview(req, res, sneaker);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

const _updateReviewProperties = function (req, sneaker, isFullUpdate) {
  const reviewId = req.params.reviewId;
  const review = sneaker.reviews.id(reviewId);

  if (isFullUpdate) {
    review.title = req.body.title;
    review.review = req.body.review;
    review.rate = parseInt(req.body.rate);
  } else {
    if (req.body.title) {
      review.title = req.body.title;
    }
    if (req.body.review) {
      review.review = req.body.review;
    }
    if (req.body.rate) {
      review.rate = parseInt(req.body.rate);
    }
  }

  // update date to modified date
  review.date = new Date();
};

const _updateReview = function (req, res, isFullUpdate) {
  const sneakerId = req.params.sneakerId;

  Sneakers.findById(sneakerId)
    .select('-images')
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
        _updateReviewProperties(req, sneaker, isFullUpdate);

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

module.exports.reviewFullUpdateOne = function (req, res) {
  console.log('PUT one review');
  _updateReview(req, res, true);
};

module.exports.reviewPartialUpdateOne = function (req, res) {
  console.log('PATCH one review');
  _updateReview(req, res, false);
};

const _deleteReview = function (req, res, sneaker) {
  const reviewId = req.params.reviewId;
  const review = sneaker.reviews.id(reviewId);

  review.remove();
  sneaker.save(function (err, sneaker) {
    const response = { status: 204, message: sneaker };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.reviewDelete = function (req, res) {
  console.log('DELETE one review');
  const sneakerId = req.params.sneakerId;

  Sneakers.findById(sneakerId)
    .select('-images')
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
        _deleteReview(req, res, sneaker);
      }
    });
};
