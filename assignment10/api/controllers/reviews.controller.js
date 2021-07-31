const mongoose = require('mongoose');

const Job = mongoose.model('Jobs');

const _addReview = function (req, res, job) {
  const newReview = {
    nameOfReviewer: req.body.nameOfReviewer,
    review: req.body.review,
    date: new Date(),
  };

  job.reviews.push(newReview);

  job.save(function (err, savedJob) {
    const response = {
      status: 201,
      message: savedJob,
    };

    if (err) {
      response.status = 500;
      response.message = err;
    }

    res.status(response.status).json(response.message);
  });
};

module.exports.reviewGetAll = function (req, res) {
  const jobId = req.params.jobId;

  Job.findById(jobId).exec(function (err, job) {
    const response = { status: 200, message: {} };
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!job) {
      response.status = 404;
      response.message = { message: 'Job not found with ID:' + jobId };
    } else {
      response.message = job.reviews ? job.reviews : [];
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.reviewGetOne = function (req, res) {
  const jobId = req.params.jobId;
  const reviewId = req.params.reviewId;

  Job.findById(jobId).exec(function (err, job) {
    const response = { status: 200, message: job };
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!job) {
      response.status = 404;
      response.message = { message: 'Job not found with ID:' + jobId };
    } else {
      response.message = job.reviews.id(reviewId);
    }

    res.status(response.status).json(response.message);
  });
};

module.exports.reviewAdd = function (req, res) {
  const jobId = req.params.jobId;

  Job.findById(jobId)
    .select('reviews')
    .exec(function (err, job) {
      const response = {
        status: 201,
        message: job,
      };

      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!job) {
        console.log('Job id not found in database', id);
        response.status = 404;
        response.message = { message: 'Job ID not found' + jobId };
      }

      if (response.status === 201) {
        _addReview(req, res, job);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

const _updateReviewProperties = function (req, job, isFullUpdate) {
  const reviewId = req.params.reviewId;
  const review = job.reviews.id(reviewId);

  review.date = new Date();

  if (isFullUpdate) {
    review.nameOfReviewer = req.body.nameOfReviewer;
    review.review = req.body.review;
  } else {
    if (req.body.nameOfReviewer) {
      review.nameOfReviewer = req.body.nameOfReviewer;
    }
    if (req.body.review) {
      review.review = req.body.review;
    }
  }
};

const _updateReview = function (req, res, isFullUpdate) {
  const jobId = req.params.jobId;

  Job.findById(jobId)
    .select('-location -skill')
    .exec(function (err, job) {
      const response = {
        status: 204,
        message: job,
      };

      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!job) {
        response.status = 400;
        response.message = { message: 'Not found job with given ID' };
      }

      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        _updateReviewProperties(req, job, isFullUpdate);

        job.save(function (err, updateJob) {
          if (err) {
            response.status = 500;
            response.message = err;
          } else {
            response.status = 200;
            response.message = updateJob;
          }

          res.status(response.status).json(response.message);
        });
      }
    });
};

module.exports.reviewFullUpdateOne = function (req, res) {
  _updateReview(req, res, true);
};

module.exports.reviewPartialUpdateOne = function (req, res) {
  _updateReview(req, res, false);
};

const _deleteReview = function (req, res, job) {
  const reviewId = req.params.reviewId;
  const review = job.reviews.id(reviewId);

  review.remove();
  job.save(function (err, job) {
    const response = { status: 204, message: job };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.reviewDelete = function (req, res) {
  const jobId = req.params.jobId;

  Job.findById(jobId)
    .select('-skills -location')
    .exec(function (err, job) {
      const response = { status: 204 };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!job) {
        response.status = 404;
        response.message = { message: 'Job not found given ID' };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        _deleteReview(req, res, job);
      }
    });
};
