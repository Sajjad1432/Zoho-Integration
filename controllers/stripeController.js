const stripe = require("stripe")(
  "sk_test_51LJ0PkA1dDAJbGD4vJVJ8wm7FjQe18XkYNEd3kS1tMmQGI0YBh1KO2q6BcwuCvwbJ7nsc0NORsYvYEfnpELU9Ory003L9O9tVf"
)
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")
const User = require("../models/userSchema")

exports.createStripeCustomer = catchAsync(async (req, res, next) => {
  const { email } = req.body
  // Check if username and password exist
  if (!email) {
    return next(new AppError("Please provide email!", 400))
  }
  // Check if user exists and password is correct
  const user = await User.findOne({ email })
  if (!user) {
    const customer = await stripe.customers.create({
      email
    })
    return res.send(customer.id)
  } else return res.send(user.stripeId)
})

exports.createStripeIntent = catchAsync(async (req, res) => {
  const { money } = req.body

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: money * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true
    }
  })
  res.send({
    clientSecret: paymentIntent.client_secret
  })
})
