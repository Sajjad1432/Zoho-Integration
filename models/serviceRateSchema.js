const mongoose= require('mongoose');
const serviceRateSchema = new mongoose.Schema(
    {
        _state: {type:mongoose.Schema.Types.ObjectId, ref: 'State'},
        rate: {type: Number, required: true}
    },
    {
        timestamps:true,
    }
)
const ServiceRate = mongoose.model('serviceRates', serviceRateSchema);

module.exports = ServiceRate;