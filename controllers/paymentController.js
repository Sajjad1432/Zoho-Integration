const Payment = require("../models/paymentSchema");
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// const keys = require('../config/keys');

exports.getAllPayments = catchAsync(async (req, res, next) => {
  
  const payments = await Payment.find().select('-updatedAt -__v');

  if(payments.length < 1){
    return next(new AppError('No payments found.', 404));
  }

  res.status(201).json({
      status: 'success',
      data: {
        payments
      }
    }
  );
  }
);

exports.createPayment = catchAsync(async (req, res, next) => {
  const { _client, _sale, amount } = req.body;
  
  const payment = new Payment({_client, _sale, amount });
  await payment.save();

  res.status(201).json(
    {
      status: 'success',
      data: {
        payment
      }
    }
  );
});

exports.getPayment = catchAsync(async (req, res, next) => {
  const payment = await Payment.findById(req.params.id);

  if(!payment) {
    return next(new AppError('Payment not found.', 404));
  }

  res.status(200).send({
    success: 'success',
    data: {
      payment
    }
  });
});

exports.getClientPayments = catchAsync(async (req, res, next) => {
  const payments = await Payment.find({_client: req.params.clientId});

  if(payments.length < 1) {
    return next(new AppError('Payments not found.', 404));
  }

  res.status(201).json({
      status: 'success',
      data: {
        payments
      }
    }
  );
});
