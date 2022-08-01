const express = require('express');
const authController = require('../controllers/authController');
const subscriptionController = require('../controllers/subscriptionController');

const router = express.Router();

router
  .route('/')
  .get(subscriptionController.getAllSubscriptions)

router
  .route('/:id')
  .get(subscriptionController.getSubscription)  
  
router.route("/subscribe").post(subscriptionController.subscribe)
  
router
  .route('/client/:id')
  .get(authController.isLoggedIn, subscriptionController.getClientSubscriptions);

router
  .route("/clientSubscription")
  .post(subscriptionController.getClientSubscribe)
    
module.exports = router; 