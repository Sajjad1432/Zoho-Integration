const SubscriptionPlan = require("../models/subscriptionPlanSchema");
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const SubscriptionPlanService = require("../models/subscriptionPlanServiceSchema");
const SubscriptionPlanServicePrice = require("../models/subscriptionPlanServicePriceSchema");
// const keys = require('../config/keys');
const defaultSubscriptionPlanServicePrices = require('../defaultData/defaultSubscriptionPlanServicePrices');
const { registerUser } = require("./authController");

exports.getAllSubscriptionPlans = catchAsync(async (req, res) => {

  let subscriptionPlans = await SubscriptionPlan.find({})
    .select('-createdAt -updatedAt -__v')
    .populate({ path: 'serviceCharges', select: '-__v -createdAt -updatedAt -_subscriptionPlan', model: SubscriptionPlanServicePrice, populate: { path: '_subscriptionPlanService', select: '-__v -createdAt -updatedAt', model: SubscriptionPlanService}})
    ;
  // let planCharges = await SubscriptionPlanServicePrice.find({_subscriptionPlan: '62b4efd603243e061ad78bd2'}).select('-createdAt -updatedAt -__v -_subscriptionPlan');

  res.status(201).send({
    status: 'success',
    data: {
      subscriptionPlans
    }
  });
});

exports.createSubscriptionPlan = catchAsync(async (req, res, next) => {
  const { title, price } = req.body;

  const subscriptionPlan = await SubscriptionPlan.create({ title, price });
  res.status(200).send({
      status: 'success',
      data: {
        subscriptionPlan
      }
  });
});

exports.getSubscriptionPlan = catchAsync(async (req, res, next) => {
  
  const subscriptionPlans = await SubscriptionPlan.findById(req.params.id)
    .select('-createdAt -updatedAt -__v')
    .populate({ path: 'serviceCharges', select: '-__v -createdAt -updatedAt -_subscriptionPlan', model: SubscriptionPlanServicePrice, populate: { path: '_subscriptionPlanService', select: '-__v -createdAt -updatedAt', model: SubscriptionPlanService}});

  if(!subscriptionPlans) {
    return next(new AppError('Subscription not found.', 404));
  }

  res.status(200).send({
      success: 'success',
      data: {
        subscriptionPlans
      }
  });
});

exports.updateSubscriptionPlan = catchAsync(async (req, res) => {
  const subscriptionPlan = await SubscriptionPlan.findByIdAndUpdate(req.params.id, req.body, { 
    new: true,
    runValidators: true,
   });

  res.status(200).send({
      success: 'success',
      data: {
        subscriptionPlan
      }
  });
});

exports.getSubscriptionPlanServices = catchAsync(async (req, res) => {

  const subscriptionPlanServices = await SubscriptionPlanService.find({}).select('-createdAt -updatedAt -__v');

  res.status(201).send({
    status: 'success',
    data: {
      subscriptionPlanServices
    }
  });
});

exports.createDefaultSubscriptionPlanServiceCharges = catchAsync(async (req, res) => {

  await SubscriptionPlanServicePrice.deleteMany();
  const subscriptionPlanServicePrices = await SubscriptionPlanServicePrice.insertMany(defaultSubscriptionPlanServicePrices);
  
  res.status(201).send({
    status: 'success',
    data: {
      subscriptionPlanServicePrices
    }
  });
});