const Resource = require("../models/resourceSchema");
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// const keys = require('../config/keys');

exports.getAllResources = catchAsync(async (req, res) => {
  const resources = await Resource.find().select('-createdAt -updatedAt -__v');
  res.status(201).json({
    status: 'success',
    data: {
      resources
    }
  });
});

exports.createResource = catchAsync(async (req, res) => {
  const { title, link } = req.body;
  
  const resource = new Resource({ title, link });
  
  await resource.save();

  res.status(201).json(
    {
      status: 'success',
      data: {
        resource
      }
    }
  );
});

exports.getResource = catchAsync(async (req, res) => {
  const resource = await Resource.find({ id: req.params.id });

  if(!resource) {
    return next(new AppError('Resource not found.', 404));
  }

  res.status(200).send({
    success: 'success',
    data: {
      resource
    }
  });
});