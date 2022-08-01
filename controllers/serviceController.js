const Service = require("../models/serviceSchema");
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// const keys = require('../config/keys');

exports.getAllServices = catchAsync(async (req, res) => {
  const services = await Service.find().select('-createAt -updatedAt -__v');
  res.status(201).json({
    status: 'success',
    data: {
      services
    }
  });
});

exports.createService = catchAsync(async (req, res, next) => {
  const { title, type } = req.body;
  
  const service = new Service({ title, type });
  await service.save();

  res.status(201).json(
    {
      status: 'success',
      data: {
        service
      }
    }
  );
});

exports.getService = catchAsync(async (req, res, next) => {
  const service = await Service.findById(req.params.id).select(
    "-createAt -updatedAt -__v"
  )

  if (!service) {
    return next(new AppError("Service not found.", 404))
  }

  res.status(200).send({
    success: "success",
    data: {
      service
    }
  })
})