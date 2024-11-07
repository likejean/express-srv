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
		password: { 
			type: String, 
			required: true 
		},
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
		avatarId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Avatar',
			required: false
		},
		aboutYourself: {
			type: String,
			required: false
		},
		avatar: {
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
		}
	});

module.exports = mongoose.model('User', userSchema);
