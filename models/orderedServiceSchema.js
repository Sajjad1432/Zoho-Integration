const mongoose= require('mongoose');

const orderedServiceSchema = new mongoose.Schema(
    {
        _service: {type: mongoose.Schema.Types.ObjectId, ref: 'Service'},
        price:{type: Number}
    },
    {
        timestamps:true,
    }
)
const Order = mongoose.model('orders', orderedServiceSchema);
module.exports = Order;