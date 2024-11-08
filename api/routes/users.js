const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
var path = require("path");
var fs = require('fs');
var multer = require('multer');

const avatarPath = path.join(__dirname + '/../../public/img/avatars');

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, avatarPath);
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
// 	}
// });

const storage = multer.memoryStorage();

// my mimetype check here
const fileFilter = (req, file, cb) => {

    if (!file.mimetype.includes('image')) {
        return cb(new Error('not an image'));
    }
    cb(null, true);
};

const upload = multer({ storage, fileFilter });


router.get('/profile/:userId', async (req, res) => {
	try {
		const user = await User.findById(req.params.userId);
	
		if (!user) {
			return res.status(404).send('User not found.');
		}
	
		console.log({
			request: {
				type: 'GET',
				url: req.originalUrl,
				status: "SUCCESS"
			}});

		return res.status(200).json({
			user,
			request: {
				type: 'GET',
				url: req.originalUrl                    
			}  
		});

		} catch (error) {
			res.status(500).json({
				message: "Failure: Unable to fetch user record...",
				serverError: error.message,
				request: {
				type: "GET",
				url: req.originalUrl,
				},
			});
		}
	});


router.post('/register', upload.single("avatar"), (req, res) => {	
	const _id = new mongoose.Types.ObjectId();
	
	const {        
        email,
		password,
		username,
		firstname,
		lastname,
		age,
		aboutYourself,
		title,
		description

    } = req.body;
		
	const avatar = { 
		data: new Buffer.from(req.file.buffer, 'base64'), 
		contentType: req.file.mimetype, 
		originalName: req.file.originalname 
	};

	const user = new User({
		_id,
        email,
		password,
		username,
		firstname,
		lastname,
		age,
		aboutYourself,	
		image: {
			title,
			description,
			avatar
		}
    });
	user
		.save() //save calibration record document
		.then((result) => {
			console.log({
				request: {
					type: "POST",
					url: req.originalUrl,
					status: "SUCCESS",
				},
			});
			res.json({
				result,
				request: {
					type: 'POST',
					url: req.originalUrl
				}
			});
		})
		.catch((error) => {
			res.status(500).json({
				serverError: error.message,
				message: "Failed to save avatar image in the database",
				request: {
					type: 'POST',
					url: req.originalUrl                    
				}  
			});
		});
});


module.exports = router;