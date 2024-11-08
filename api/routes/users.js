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


router.get('/getAvatar/:id', (req, res) => {
    const { id: _id } = req.params;
    // If you dont use lean(), you wont decode image as base64
    User.findOne({ _id }).lean().exec();
    res.send(image);
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

	console.log(req.file, "req.body", req.body)
	
	const avatar = { data: new Buffer.from(req.file.buffer, 'base64'), contentType: req.file.mimetype, originalName: req.file.originalname };
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