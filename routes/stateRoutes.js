const express = require('express');
const stateController = require('../controllers/stateController');

const router = express.Router();

router
  .route('/')
  .get(stateController.getAllStates)
  
router
  .route('/:abbreviation')
  .get(stateController.getState)
  
router.route("/state/:id").get(stateController.getStateById)

router.route("/states/price").get(stateController.statePrice)

module.exports = router; 