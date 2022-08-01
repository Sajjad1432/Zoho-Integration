const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")
const ApplicationForm = require("../models/applicationFormSchema")

exports.getAllApplicationFormFields = catchAsync(async (req, res, next) => {
  // Check if username and password exist
  const applicationForm = await ApplicationForm.findOne({}).select(
    "-createdAt -updatedAt -__v"
  )
  if (applicationForm) {
    res.send(applicationForm)
  }
  res.send([])
  // Check if user exists and password is correct
})

exports.getApplicationForm = catchAsync(async (req, res, next) => {
  const { state, type } = req.query

  // Check if username and password exist
  if (!state || !type) {
    return next(new AppError("Please provide state and type!", 400))
  }
  // Check if username and password exist
  const applicationForm = await ApplicationForm.findOne({ state, type }).select(
    "-createdAt -updatedAt -__v"
  )

  res.send(applicationForm)
  // Check if user exists and password is correct
})
