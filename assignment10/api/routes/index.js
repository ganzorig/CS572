const express = require('express');

const jobsControllers = require('../controllers/jobs.controller');
const locationControllers = require('../controllers/location.controller');
const controllerReviews = require('../controllers/reviews.controller');

const router = express.Router();

router
  .route('/jobs')
  .get(jobsControllers.getAllJobs)
  .post(jobsControllers.addJob);

router
  .route('/jobs/:jobId')
  .get(jobsControllers.getOneJob)
  .put(jobsControllers.jobUpdateFull)
  .patch(jobsControllers.jobUpdatePartial)
  .delete(jobsControllers.jobDelete);

router
  .route('/jobs/:jobId/location')
  .get(locationControllers.locationGetOne)
  .post(locationControllers.locationAdd)
  .put(locationControllers.locationFullUpdateOne)
  .patch(locationControllers.locationPartialUpdateOne)
  .delete(locationControllers.locationDelete);

router
  .route('/jobs/:jobId/reviews')
  .get(controllerReviews.reviewGetAll)
  .post(controllerReviews.reviewAdd);

router
  .route('/jobs/:jobId/reviews/:reviewId')
  .get(controllerReviews.reviewGetOne)
  .put(controllerReviews.reviewFullUpdateOne)
  .patch(controllerReviews.reviewPartialUpdateOne)
  .delete(controllerReviews.reviewDelete);

module.exports = router;
