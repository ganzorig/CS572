const express = require('express');

const controllerSneakers = require('../controllers/sneakers-controllers');
const controllerReviews = require('../controllers/reviews-controller');
const controllerImages = require('../controllers/images-controller');
const controllerUsers = require('../controllers/user-controller');

const router = express.Router();

router
  .route('/sneakers')
  .get(controllerSneakers.sneakersGetAll)
  .post(controllerUsers.authenticate, controllerSneakers.sneakersAddOne);

router
  .route('/sneakers/:sneakerId')
  .get(controllerSneakers.sneakersGetOne)
  .put(controllerSneakers.sneakerFullUpdateOne)
  .patch(controllerSneakers.sneakerPartialUpdateOne)
  .delete(controllerSneakers.sneakerDeleteOne);

router
  .route('/sneakers/:sneakerId/images')
  .get(controllerImages.imagesGetAll)
  .post(controllerImages.imagesAdd)
  .delete(controllerImages.imagesDelete);

router
  .route('/sneakers/:sneakerId/reviews')
  .get(controllerReviews.reviewGetAll)
  .post(controllerReviews.reviewAdd);

router
  .route('/sneakers/:sneakerId/reviews/:reviewId')
  .get(controllerReviews.reviewGetOne)
  .put(controllerReviews.reviewFullUpdateOne)
  .patch(controllerReviews.reviewPartialUpdateOne)
  .delete(controllerReviews.reviewDelete);

module.exports = router;
