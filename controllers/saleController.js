const Sale = require("../models/saleSchema");
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// const keys = require('../config/keys');

exports.getSaleReport = catchAsync(async (req, res, next) => {
  // Code to get date-bound state-wise report 
  res.status(201).json({
    status: 'success',
    data: {}
  });
});

exports.createSale = catchAsync(async (req, res, next) => {
  const { _user, amount, _services } = req.body;
  
  const sale = new Sale({ _user, amount, _services });
  await sale.save();

  res.status(201).json(
    {
      status: 'success',
      data: {
        sale
      }
    }
  );
});

exports.getClientSales = catchAsync(async (req, res, next) => {

  const sales = await Sale.find({ _user: req.params.clientId }).select('-updatedAt -__v');

  if(sales.length < 1) {
    return next(new AppError('No sales found.', 404));
  }

  res.status(201).json({
    status: 'success',
    data: {
      sales
    }
  });
});

exports.getSale = catchAsync(async (req, res, next) => {

  const sale = await Sale.findById(req.params.id);
 
  if(!sale) {
    return next(new AppError('Sale not found.', 404));
  }

  res.status(200).send({
      success: 'success',
      data: {
        sale
      }
  });
});

exports.getAllSales = catchAsync(async (req, res, next) => {

  const sales = await Sale.find({}).select('-updateAt -__v');
 
  if(sales.length < 1) {
    return next(new AppError('Sale not found.', 404));
  }

  res.status(200).send({
      success: 'success',
      data: {
        sales
      }
  });
});