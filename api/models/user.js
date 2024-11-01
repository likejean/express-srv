const mongoose = require('mongoose');

const userLevels = [
    'Admin',
    'User',
    'Quest'
];

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
	username: {
		type: String,
		required: true,
		unique: true
	},	
	level: {
		type: String,
		required: true,
		enum: userLevels
	},
	avatar: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('User', userSchema);
