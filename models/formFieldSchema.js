const mongoose= require('mongoose'); 
const formFieldSchema = new mongoose.Schema(
    {
        title: {type:String, required: true},
        _service: {type: mongoose.Schema.Types.ObjectId, ref: 'Service'}
    },
    {
        timestamps:true,
    }
)
const FormField = mongoose.model('formFields', formFieldSchema);
module.exports = FormField;