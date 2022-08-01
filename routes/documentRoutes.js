const express = require('express');
const documentController = require('../controllers/documentController');

const router = express.Router();

router
  .route('/')
  .get(documentController.getAllDocuments)

router
  .route('/:id')
  .get(documentController.getDocument)
  .patch(documentController.updateDocument);

router
  .route('/client/:id')
  .get(documentController.getClientDocuments);
  
module.exports = router; 