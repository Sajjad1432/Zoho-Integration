const express = require("express")
const stripeController = require("../controllers/stripeController")

const router = express.Router()

router
  .route("/createStripeCustomer")
  .post(stripeController.createStripeCustomer)

router.route("/createPaymentIntent").post(stripeController.createStripeIntent)

module.exports = router
