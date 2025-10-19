const mongoose = require('mongoose');

const articleSchema = mongoose.Schema(
	{
		_id: mongoose.Schema.Types.ObjectId,
		procedureId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Procedure',
			required: true
		},
		title: { 
			type: String, 
			required: true 
		},
		content: { 
			type: String, 
			required: true
		},
		formula: { 
			type: String, 
			required: true
		},
		imageLink: {
			type: String,
			required: true,
			// Optional: Add a custom validator for URL format
			validate: {
			validator: function(v) {
					// Basic URL validation using a regular expression
					return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
				},
				message: props => `${props.value} is not a valid URL!`
			}
		},
		resourceLink: {
			type: String,
			required: true,
			// Optional: Add a custom validator for URL format
			validate: {
			validator: function(v) {
					// Basic URL validation using a regular expression
					return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
				},
				message: props => `${props.value} is not a valid URL!`
			}
		},
		createdAt: { type: 
            Date, default: 
            Date.now, 
            required: false
        },
	}
);

module.exports = mongoose.model('Article', articleSchema);