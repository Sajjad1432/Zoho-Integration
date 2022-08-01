const mongoose= require('mongoose'); 
const serviceSchema = new mongoose.Schema(
    {
        title: {type:String, required: true},
        type: { type:String, required: true },
        serviceCharges: [{type: mongoose.Schema.Types.ObjectId, ref: 'ServiceRate'}],
        formFields: [{type: mongoose.Schema.Types.ObjectId, ref: 'FormField'}],
        stateFormFields: [{type: mongoose.Schema.Types.ObjectId, ref: 'StateFormField'}],
    },
    {
        timestamps:true,
    }
)
const Service = mongoose.model('services', serviceSchema);
module.exports = Service;