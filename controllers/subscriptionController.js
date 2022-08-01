const SubscriptionPlan = require("../models/subscriptionPlanSchema");
const Subscription = require('../models/subscriptionSchema');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require("../models/userSchema");

// const keys = require('../config/keys');

exports.getAllSubscriptions = catchAsync(async (req, res, next) => 
{
  const subscriptions = await Subscription.find().select('-createdAt -updatedAt -__v');

  res.status(201).send({
    status: 'success',
    data: {
      subscriptions
    }
  });
});

exports.getSubscription = catchAsync(async (req, res, next) => {
  const subscription = await Subscription.findById(req.params.id).select('-createdAt -updatedAt -__v');

  if(!subscription) {
    return next(new AppError('Subscription not found.', 404));
  }

  res.status(200).send({
      success: 'success',
      data: {
        subscription
      }
  });
});

exports.subscribe = catchAsync(async (req, res, next) => {
  const { _subscriptionPlan, active, state, type, email } = req.body
  const subscription = await Subscription.create({
    _subscriptionPlan,
    active,
    email,
    state,
    type
  })
  res.status(200).send({
    status: "success",
    data: {
      subscription
    }
  })
})

exports.getClientSubscriptions = catchAsync(async (req, res, next) => {
  
  const client = req.user;
  if(!client) {
    return next(new AppError('You are not logged in.', 404));
  }

  const subscriptions = await Subscription.find({ _user: req.params.clientId }).select('-createdAt -updatedAt -__v');
  
  res.status(200).send({
      success: 'success',
      data: { subscriptions }
  });
});

exports.getClientSubscribe = catchAsync(async (req, res, next) => {
  const subscriptions = await Subscription.findOne({
    email: req.body.email
  }).select("-createdAt -updatedAt -__v")

  res.status(200).send({
    success: "success",
    data: subscriptions
  })
})