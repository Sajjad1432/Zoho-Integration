const mongoose= require('mongoose');
const paymentSchema = new mongoose.Schema(
    {
        _client: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
        _order: {type:mongoose.Schema.Types.ObjectId, ref: 'Order'},
        amount:{type: Number, required: true},
        status:{type: Boolean, default: false}
    },
    {
        timestamps:true,
    }
)
const Payment = mongoose.model('payments', paymentSchema);
module.exports = Payment;