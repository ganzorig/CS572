const mongoose = require('mongoose');

const Job = mongoose.model('Jobs');

module.exports.locationGetOne = function (req, res) {
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
      response.message = job.location;
    }
    res.status(response.status).json(response.message);
  });
};

const _addLocation = function (req, res, job) {
  job.location = {
    country: req.body.country,
    coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
  };

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

module.exports.locationAdd = function (req, res) {
  const jobId = req.params.jobId;

  Job.findById(jobId)
    .select('location')
    .exec(function (err, job) {
      const response = {
        status: 201,
        message: job,
      };

      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!job) {
        response.status = 404;
        response.message = { message: 'Job ID not found' + jobId };
      }

      if (response.status === 201) {
        _addLocation(req, res, job);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

const _updateLocationProperties = function (req, job, isFullUpdate) {
  if (isFullUpdate) {
    job.location = {
      country: req.body.country,
      coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    };
  } else {
    if (req.body.country) {
      job.location.country = req.body.country;
    }
    if (req.body.lng && req.body.lat) {
      job.location.coordinates = [
        parseFloat(req.body.lng),
        parseFloat(req.body.lat),
      ];
    }
  }
};

const _updateLocation = function (req, res, isFullUpdate) {
  const jobId = req.params.jobId;

  Job.findById(jobId)
    .select('-reviews')
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
        _updateLocationProperties(req, job, isFullUpdate);

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

module.exports.locationFullUpdateOne = function (req, res) {
  console.log('PUT');
  _updateLocation(req, res, true);
};

module.exports.locationPartialUpdateOne = function (req, res) {
  console.log('PATCH');
  _updateLocation(req, res, false);
};

module.exports.locationDelete = function (req, res) {
  const jobId = req.params.jobId;

  Job.findById(jobId)
    .select('-reviews -skills')
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
        job.location.remove();
        job.save(function (err, job) {
          const response = { status: 204, message: job };
          if (err) {
            response.status = 500;
            response.message = err;
          }
          res.status(response.status).json(response.message);
        });
      }
    });
};
