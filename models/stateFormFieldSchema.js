const mongoose= require('mongoose'); 
const stateFormFieldsSchema = new mongoose.Schema(
    {
      required: { type: Boolean, default: false },
      _formField: {type: mongoose.Schema.Types.ObjectId, ref: 'FormField'},
      _service: {type: mongoose.Schema.Types.ObjectId, ref: 'Service'},
      _state: {type: mongoose.Schema.Types.ObjectId, ref: 'State'}
    },
    {
        timestamps:true,
    }
)
const StateFormField = mongoose.model('stateFormFields', stateFormFieldsSchema);
module.exports = StateFormField;