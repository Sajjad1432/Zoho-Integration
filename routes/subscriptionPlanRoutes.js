const express = require('express');
const authController = require('../controllers/authController');
const subscriptionPlanController = require('../controllers/subscriptionPlanController');

const router = express.Router();

router
  .route('/')
  .get(subscriptionPlanController.getAllSubscriptionPlans)
  .post(subscriptionPlanController.createSubscriptionPlan);
  
router
    .route('/services')
    .get(subscriptionPlanController.getSubscriptionPlanServices);

router
  .route('/serviceCharges')
  // You need to update Default Service Charges ( in default data)
  // after creation of default data and
  // before calling the below method
  .get(subscriptionPlanController.createDefaultSubscriptionPlanServiceCharges)

router
  .route('/:id')
  .get(subscriptionPlanController.getSubscriptionPlan)
  .patch(subscriptionPlanController.updateSubscriptionPlan);

module.exports = router; 