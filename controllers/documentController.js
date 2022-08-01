const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// const keys = require('../config/keys');

exports.getAllDocuments = catchAsync(async (req, res, next) => {
  // ======================================
  // Code to get data from Zoho
  // ======================================
  res.status(201).json({
    status: 'success',
    data: {}
  });
});

exports.getDocument = catchAsync(async (req, res, next) => {
  // ======================================
  // Code to get data from Zoho
  // ======================================
  res.status(201).json({
    status: 'success',
    data: {}
  });
});

exports.updateDocument = catchAsync(async (req, res, next) => {
  // ======================================
  // Code to update data in Zoho
  // ======================================
  res.status(201).json({
    status: 'success',
    data: {}
  });
});

exports.getClientDocuments = catchAsync(async (req, res, next) => {
  // ======================================
  // Code to get data from Zoho
  // ======================================
  res.status(201).json({
    status: 'success',
    data: {}
  });
});