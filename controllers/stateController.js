const catchAsync = require('../utils/catchAsync');
const State = require("../models/stateSchema");
const StatePrice = require("../models/statePriceSchema")
const AppError = require("../utils/appError")

// const keys = require('../config/keys');

exports.getAllStates = catchAsync(async (req, res, next) => {
  const states = await State.find().select("-createdAt -updatedAt -__v")
  res.status(201).json({
    status: "success",
    data: {
      states
    }
  })
})

exports.getState = catchAsync(async (req, res, next) => {
  const state = await State.find({
    abbreviation: { $regex: req.params.abbreviation, $options: "i" }
  }).select("-createdAt -updatedAt -__v")

  if (!state) {
    return next(new AppError("State not found.", 404))
  }

  res.status(200).send({
    success: "success",
    data: {
      state
    }
  })
})

exports.getStateById = catchAsync(async (req, res, next) => {
  const state = await State.findOne({
    _id: req.params.id
  }).select("-createdAt -updatedAt -__v")

  if (!state) {
    return next(new AppError("State not found.", 404))
  }
  res.status(200).send({
    success: "success",
    state: state.name
  })
})

exports.statePrice = catchAsync(async (req, res, next) => {
  const { state, type } = req.query
  const statePrice = await StatePrice.findOne({
    type,
    state
  }).select("-createdAt -updatedAt -__v")

  if (!statePrice) {
    return res.status(200).send({
      new: 0,
      renew: 0,
      late: 0
    })
  } else return res.status(200).send(statePrice)
})