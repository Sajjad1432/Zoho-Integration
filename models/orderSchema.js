const mongoose= require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        _orderedServices:[{type: [mongoose.Schema.Types.ObjectId], ref: 'Service'}],
        amount:{type: Number, required: true},
        status:{type: String, default: 'Not Started'}
    },
    {
        timestamps:true,
    }
)
const Order = mongoose.model('orders', orderSchema);
module.exports = Order;