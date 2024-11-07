const express = require('express');
const router = express.Router();
const Avatar = require("../models/avatar");
const mongoose = require('mongoose');
const User = require('../models/user');
var path = require("path");
var fs = require('fs');
var multer = require('multer');

const avatarPath = path.join(__dirname + '/../../public/img/avatars');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, avatarPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
	}
})

const upload = multer({ storage });


router.get('/upload', (req, res) => {
    //res.sendFile(path.join(__dirname + '/../../public/html/userRegister.html'));
	Avatar.find({})
    .then((data, err)=>{
        if(err){
            console.log(err);
        }
        res.render("/api/users/avatar",{items: data})
    })
});


router.post('/upload', upload.single("avatar"), (req, res) => {	
	const _id = new mongoose.Types.ObjectId();

	const avatar = new Avatar({
        _id,
        username: "admin",
        title: req.body.title,
        description: req.body.description,
        image: {
            data: fs.readFileSync(avatarPath + '/' + req.file.filename),
            contentType: 'image/jpg'
        }
    });

	avatar
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
				file: req.file
			});
		})
		.catch(() => {
			res.status(500).json({
				message: "Failed to save avatar image in the database",
				request: {
					type: 'POST',
					url: req.originalUrl                    
				}  
			});
		});
});


module.exports = router;