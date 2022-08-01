const mongoose= require('mongoose');
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userRole: { type: String, required: true },
    password: { type: String, required: true },
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
    stripeId: { type: String, default: "" },
    subscriptionPlanId: { type: String, default: "" },
    registeredSuccsessfully: { type: Boolean, default: false },
    zohoAccountId: {type: String, default: ""},
  },
  {
    timestamps: true
  }
)
const User = mongoose.model('users', userSchema);
module.exports = User;