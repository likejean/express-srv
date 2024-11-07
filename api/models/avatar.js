var mongoose = require('mongoose');

const avatarSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    username: {
        type: String, 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    image:
    {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Avatar', avatarSchema);