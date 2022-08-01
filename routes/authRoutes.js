const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router
  .route('/seed')
  .get(authController.createDefaultData);

router
  .route('/login')
  .post(authController.login);
  
router
  .route('/logout')
  .get(authController.logout);

router
  .route('/current_user')
  .get(authController.isLoggedIn, authController.getCurrentUser);
  // .get(authController.getCurrentUser);

router
  .route('/register')
  .post(authController.registerUser);

router.route("/completeRegistration").post(authController.completeRegistration)

router.route("/checkEmail").post(authController.checkEmail)
  
module.exports = router; 