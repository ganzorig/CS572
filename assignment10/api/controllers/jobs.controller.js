const mongoose = require('mongoose');

const Jobs = mongoose.model('Jobs');

const _convertToArray = function (skills) {
  return skills
    .split(',')
    .map(function (item) {
      return item.trim();
    })
    .filter(function (item) {
      return item;
    });
};

const _getGeoQuery = function (req, res) {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);

  console.log('Geo location search', lng, lat);

  if (isNaN(lat) || isNaN(lng)) {
    return res
      .status(400)
      .json({ message: 'Longitude and Latitude values should be numbers' });
  }

  const query = {
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [lng, lat],
        },
        $maxDistance: 10000,
        $minDistance: 0,
      },
    },
  };

  return query;
};

const _searchQuery = function (req, res) {
  const keyword = req.query.search;

  const query = {
    title: { $regex: keyword, $options: 'i' },
  };

  return query;
};

const _updateJobProperties = function (req, job, isFullUpdate) {
  if (isFullUpdate) {
    job.title = req.body.title;
    job.description = req.body.description;
    job.experience = req.body.experience;
    job.salary = parseFloat(req.body.salary);
    job.skills = _convertToArray(req.body.skills);
  } else {
    if (req.body.title) {
      job.title = req.body.title;
    }
    if (req.body.description) {
      job.description = req.body.description;
    }
    if (req.body.experience) {
      job.experience = req.body.experience;
    }
    if (req.body.salary) {
      job.salary = parseFloat(req.body.salary);
    }
    if (req.body.skills) {
      job.skills = _convertToArray(req.body.skills);
    }
  }
};

const _updateJob = function (req, res, isFullUpdate) {
  const jobId = req.params.jobId;

  Jobs.findById(jobId)
    .select('-reviews -postDate')
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
        _updateJobProperties(req, job, isFullUpdate);

        job.save(function (err, updatedJob) {
          if (err) {
            response.status = 500;
            response.message = err;
          } else {
            response.status = 200;
            response.message = updatedJob;
          }

          res.status(response.status).json(response.message);
        });
      }
    });
};

module.exports.getAllJobs = function (req, res) {
  const response = {};
  let additionalQuery;

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

  if (req.query && req.query.search) {
    additionalQuery = _searchQuery(req, res);
  }

  if (req.query && req.query.lat && req.query.lng) {
    additionalQuery = { ...additionalQuery, ..._getGeoQuery(req, res) };
  }

  console.log(additionalQuery);

  Jobs.find(additionalQuery)
    .skip(offset)
    .limit(count)
    .exec(function (err, jobs) {
      if (err) {
        response.status = 500;
        response.message = err;
      } else {
        response.status = 200;
        response.message = jobs;
      }
      res.status(response.status).json(response.message);
    });
};

module.exports.addJob = function (req, res) {
  const newJob = {
    title: req.body.title,
    description: req.body.description,
    experience: req.body.experience,
    salary: parseFloat(req.body.salary),
    location: {
      country: req.body.country,
      coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    },
    skills: _convertToArray(req.body.skills),
    postDate: new Date(),
  };

  Jobs.create(newJob, function (err, createResponse) {
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

module.exports.getOneJob = function (req, res) {
  const jobId = req.params.jobId;

  Jobs.findById(jobId).exec(function (err, job) {
    const response = {
      status: 200,
      message: job,
    };

    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!job) {
      response.status = 400;
      response.message = { message: 'Job not found given ID' };
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.jobUpdateFull = function (req, res) {
  console.log('PUT');
  _updateJob(req, res, true);
};

module.exports.jobUpdatePartial = function (req, res) {
  console.log('PATCH');
  _updateJob(req, res, false);
};

module.exports.jobDelete = function (req, res) {
  const jobId = req.params.jobId;

  Jobs.findByIdAndDelete(jobId).exec(function (err, deletedJob) {
    const response = {
      status: 204,
      message: deletedJob,
    };

    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!deletedJob) {
      response.status = 400;
      response.message = { message: 'Job not found given ID' };
    }
    res.status(response.status).json(response.message);
  });
};
