const mongoose = require("mongoose")
const ApplicationFormSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    canceled_at: { type: String, default: "" },
    cancellation_reason: { type: String, default: "" },
    client_secret: { type: String, default: "" },
    currency: { type: String, default: "" },
    customer: { type: String, default: "" },
    description: { type: String, default: "" },
    invoice: { type: String, default: "" },
    metadata: { type: { String }, default: "" },
    processing: { type: Boolean, default: "" },
    receipt_email: { type: String, default: "" },
    setup_future_usage: { type: String, default: "" },
    description: { type: String, default: "" }
  },
  {
    timestamps: true
  }
)
const ApplicationForm = mongoose.model(
  "applicationFormSchema",
  ApplicationFormSchema
)
module.exports = ApplicationForm
