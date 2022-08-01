const express = require('express');
const rateGridController = require('../controllers/rateGridController');

const router = express.Router();

router
  .route('/')
  .get(rateGridController.getAllRates)
  .post(rateGridController.createServiceRate)

// router
//   .route('/service/:serviceId')
//   .get(rateGridController.getServiceRates)
  
module.exports = router; 