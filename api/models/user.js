const mongoose = require('mongoose');
const { userLevels } = require('../../enums/modelEnums');


const userSchema = mongoose.Schema(
	{
		_id: mongoose.Schema.Types.ObjectId,
		registeredAt:  { type: Date, default: Date.now, required: false},
		email: {
			type: String,
			required: true,
			unique: true,
			match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
		},
		password: { 
			type: String, 
			required: true,
			unique: true
		},
		username: {
			type: String,
			required: true,
			unique: true
		},	
		firstname: {
			type: String,
			required: false
		},
		lastname: {
			type: String,
			required: false
		},
		age: {
			type: String,
			required: false
		},
		level: {
			type: String,
			default: "User",
			required: false,
			enum: userLevels
		},
		aboutYourself: {
			type: String,
			required: false
		},
		image: {
			title: { 
				type: String, 
				required: true		
			},
			description: { 
				type: String, 
				required: true 
			},
			avatar:
			{
				data: Buffer,
				contentType: String,
				originalName: String
			}
		}
	});

module.exports = mongoose.model('User', userSchema);
