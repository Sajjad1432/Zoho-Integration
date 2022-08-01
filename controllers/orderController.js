const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const zoho = require("./ZohoController");
// const keys = require('../config/keys');

exports.getAllOrders = catchAsync(async (req, res, next) => {
  // ======================================
  // Code to get data from Zoho
  // ======================================
  res.status(201).json({
    status: "success",
    data: {},
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  // ======================================
  // Code to cretae Order in Zoho
  // ======================================

  const formData = {
    Owner: "Sajjad Ali",
    Description: "Hello World!",
    Status: "Not Started",
    Due_Date: "2020-08-06",
  };

  const zohoTask = await zoho.createZohoTask(formData);

  res.status(201).json({
    status: "success",
    data: { zohoTask },
  });
});

exports.getOrder = catchAsync(async (req, res, next) => {
  // ======================================
  // Code to get data from Zoho
  // ======================================
  res.status(201).json({
    status: "success",
    data: {},
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  // ======================================
  // Code to update data in Zoho
  // ======================================
  res.status(201).json({
    status: "success",
    data: {},
  });
});

exports.getClientOrders = catchAsync(async (req, res, next) => {
  // ======================================
  // Code to get data from Zoho
  // ======================================
  res.status(201).json({
    status: "success",
    data: {},
  });
});
