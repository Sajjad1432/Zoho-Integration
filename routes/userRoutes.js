const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)

router
  .route('/:id/profile')
  .get(userController.getProfile)
  .patch(userController.updateProfile)

router
  .route('/clients')
  .get(userController.getAllClients)

module.exports = router; 