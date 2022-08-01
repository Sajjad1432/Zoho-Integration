const mongoose= require('mongoose');
const stateSchema = new mongoose.Schema(
    {
        abbreviation: {type: String, required: true},
        name: {type: String, required: true}
    },
    {
        timestamps:true,
    }
)
const State = mongoose.model('states', stateSchema);
module.exports = State;