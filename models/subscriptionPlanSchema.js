const mongoose= require('mongoose');

const subscriptionPlanSchema = new mongoose.Schema(
    {
        title: {type:String},
        price: {type:Number},
        recurringPeriod: {type:String},
        serviceCharges: [{type: mongoose.Schema.Types.ObjectId, ref:'SubscriptionPlanServicePrice'}]
    },
    {
        timestamps:true,
        // toObject: true
    }
)
const SubscriptionPlan = mongoose.model('subscriptionPlans', subscriptionPlanSchema);
module.exports = SubscriptionPlan;