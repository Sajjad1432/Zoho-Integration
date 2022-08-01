const mongoose = require("mongoose")
const statePriceSchema = new mongoose.Schema(
  {
    state: { type: String, required: true },
    new: { type: Number, default: 0 },
    renew: { type: Number, default: 0 },
    late: { type: Number, default: 0 },
    type: { type: String, required: true }
  },
  {
    timestamps: true
  }
)
const StatePrice = mongoose.model("statePrice", statePriceSchema)
module.exports = StatePrice
