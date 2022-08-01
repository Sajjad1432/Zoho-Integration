const mongoose= require('mongoose');
const subscriptionSchema = new mongoose.Schema(
  {
    _subscriptionPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubscriptionPlan"
    },
    status: { type: Boolean, default: false },
    dueDate: { type: Date, default: Date.now() },
    monthsRemaining: { type: Number, default: 12 },
    state: { type: String, default: "" },
    type: { type: String, default: "" },
    email: { type: String, default: "" }
  },
  {
    timestamps: true
  }
)
const Subscription = mongoose.model('subscriptions', subscriptionSchema);
module.exports = Subscription;