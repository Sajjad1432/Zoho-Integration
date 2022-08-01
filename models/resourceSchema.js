const mongoose= require('mongoose');
const resourceSchema = new mongoose.Schema(
    {
        title: {type:String, required: true},
        link:{type: String, required: true}
    },
    {
        timestamps:true,
    }
)
const Resource = mongoose.model('resources', resourceSchema);
module.exports = Resource;