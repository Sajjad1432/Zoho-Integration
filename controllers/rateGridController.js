const ServiceRate = require("../models/serviceRateSchema");
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// const keys = require('../config/keys');

exports.getAllRates = catchAsync(async (req, res, next) => {
  const serviceRates = await ServiceRate.find().select('-createdAt -updatedAt -__v');

  res.status(201).json({
    status: 'success',
    data: {
      serviceRates
    }
  });
});

// exports.getServiceRates = catchAsync(async (req, res, next) => {
  
//   const serviceRates = await ServiceRate.find({ _service: req.params.serviceId}).select('-createdAt -updatedAt -__v');
//   res.status(201).json({
//     status: 'success',
//     data: {
//       serviceRates
//     }
//   });
// });

exports.createServiceRate = catchAsync(async (req, res, next) => {
  const { _state, rate, _service } = req.body;
  
  const serviceRate = new ServiceRate({ _state, rate, _service });
  await serviceRate.save();

  res.status(201).json(
    {
      status: 'success',
      data: {
        serviceRate
      }
    }
  );
});