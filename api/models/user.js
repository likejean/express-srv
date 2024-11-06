const mongoose = require('mongoose');

const userLevels = [
    'Admin',
    'User',
    'Quest'
];


const userSchema = mongoose.Schema(
	{
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
		firstname: {
			type: String,
			required: false,
			unique: true
		},
		lastname: {
			type: String,
			required: false,
			unique: true
		},
		age: {
			type: String,
			required: false,
			unique: true
		},
		level: {
			type: String,
			required: true,
			enum: userLevels
		},
		avatar: {
			data: Buffer,
			contentType: String
		}, 
		aboutYourself: {
			type: String,
			required: false
		},
	});

module.exports = mongoose.model('User', userSchema);
