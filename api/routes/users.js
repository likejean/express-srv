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



//Routers

/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
// GET endpoint: get ALL user records
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
router.get('/', (req, res, next) => {
    User
        .find()
        .exec()
        .then(docs => {
            console.log({
                total: docs.length,
                request: {
                    type: 'GET',
                    url: req.originalUrl,
                    status: "SUCCESS"
                }});
            res.status(200).json({
                message: `Successfully fetched ${docs.length} user record(s)`,
            	collectionName: "users",
                payload: docs.map(doc => {                    
                    return {
                        _id: doc._id,
        				email: doc.email,
						password: doc.password,
						username: doc.username,
						firstname: doc.firstname,
						lastname: doc.lastname,
						age: doc.age,
						aboutYourself: doc.aboutYourself,
						avatarTitle: doc.image.title,
						avatarDescription: doc.image.description,
						avatarImageData: doc.image.avatar.data, 
                        request: {
                            type: 'GET',
                            url: req.originalUrl                    
                        }  
                    };                    
                }),
                total: docs.length,
                request: {
                type: 'GET',
                url: req.originalUrl
            }
            });
        })
        .catch((error) => {
            res.status(500).json({
				message:
                "Failed to fetch user documents... Something went wrong",
                serverError: error.message,
                request: {
                    type: 'GET',
                    url: req.originalUrl                    
                }  
            });
        });
});


/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
// GET endpoint: get a user record by ID
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
router.get('/profile/:userId', async (req, res) => {
	try {
		const user = await User.findById(req.params.userId);	
		if (!user) {
			console.log({
				request: {
					message: "Failed to fetch user by ID (most likely document id not valid)",
					isIdValid: mongoose.Types.ObjectId.isValid(req.params.userId),
					type: "GET",
					url: req.originalUrl,
					status: "FAILURE",
				},
			});
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
	} 
	catch (error) {
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




/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
//POST endpoint: creates a new user RECORD w/ avatar image (base64 buffer-type field)
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
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