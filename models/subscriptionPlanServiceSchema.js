const mongoose= require('mongoose');

const subscriptionPlanServicesSchema = new mongoose.Schema(
    {
        title: {type:String},
        category: {type:String},
    },
    {
        timestamps:true,
    }
)
const SubscriptionPlanService = mongoose.model('subscriptionPlanServices', subscriptionPlanServicesSchema);
module.exports = SubscriptionPlanService;