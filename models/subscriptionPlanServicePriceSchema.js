const mongoose= require('mongoose');

const subscriptionPlanServicePriceSchema = new mongoose.Schema(
    {
      // valueType can either be
      // String or Number
      valueType: {type:String, required: true},
      stringValue: {type: String},
      numericValue: {type: Number},
      recurringPeriod: {type: String},
      // _subscriptionPlan: {type: mongoose.Schema.Types.ObjectId, ref: 'SubscriptionPlan'},
      _subscriptionPlanService: {type: mongoose.Schema.Types.ObjectId, ref: 'SubscriptionPlanService'}
    },
    {
        timestamps:true,
    }
)
const SubscriptionPlanServicePrice = mongoose.model('subscriptionPlanServicePrice', subscriptionPlanServicePriceSchema);
module.exports = SubscriptionPlanServicePrice;