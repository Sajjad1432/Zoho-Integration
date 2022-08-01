const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router
  .route('/')
  .get(paymentController.getAllPayments)
  .post(paymentController.createPayment)

router
  .route('/:id')
  .get(paymentController.getPayment)

router
  .route('/client/:clientId')
  .get(paymentController.getClientPayments)
  
module.exports = router; 