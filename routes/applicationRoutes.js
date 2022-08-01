const express = require("express")
const applicationForm = require("../controllers/applicationFormController")

const router = express.Router()

router.route("/").get(applicationForm.getApplicationForm)

module.exports = router
