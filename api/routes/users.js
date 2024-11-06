const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
var path = require("path");
var multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname + '/../../public/img/avatars'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
	}
})

const upload = multer({ storage });


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../../public/html/userRegister.html'));
});

router.post('/upload', upload.single("avatar"), (req, res) => {
	console.log({
		request: {
			type: "POST",
			url: req.originalUrl,
			status: "SUCCESS",
		},
	});
	res.json(req.file);
});


module.exports = router;