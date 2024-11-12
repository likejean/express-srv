const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../auth/authentication');
const config = require('../auth/config');
var multer = require('multer');

//const avatarPath = path.join(__dirname + '/../../public/img/avatars');
///The memory storage engine stores the files in memory as Buffer objects. It dumps data after request ends.
const storage = multer.memoryStorage();


// my mimetype check here
const fileFilter = (req, file, cb) => {

    if (!file.mimetype.includes('image')) {
        return cb(new Error('this file not an image'));
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
router.get('/:userId', async (req, res) => {
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
//PATCH endpoint: update image for user avatar found by ID
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
router.patch('/updateAvatar/:userId', upload.single('avatar'), async (req, res) => {
	try {
		const title = req.body.title;
		const description = req.body.description;
		const id = req.params.userId;
		const imageData = req.file.buffer;
		const contentType = req.file.mimetype;		
	
		const result = await User.findByIdAndUpdate(
			id,			
			{ 
				image: {
					avatar: imageData, 
					contentType, 
					title,
					description
				}
			},
			{ new: true }
		);
	
		if (!result) {
			return res.status(404).send(`User {id:${id}} not found`);
		}  
		console.log({
            request: {
                type: "PATCH",
                url: req.originalUrl,
                status: "SUCCESS",
            },
        });
        res.status(200).json({
            message: `Avatar image updated successfully for a user {id:${id}}`,
            request: {
                type: "PATCH",
            },
            result,
        });
	} catch (error) {
		res.status(500).json({
            message: "Failure: Unable to update user avatar image...",
            isIdValid: mongoose.Types.ObjectId.isValid(id),
            serverError: error.message,
            request: {
                type: "PATCH",
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
	

	//Check if a user exists with the current req.body.email
	User.find({email})
		.exec()
		.then(user => {
			//Throw error if a user already exists with the current req.body.email
			if (user.length >= 1) {
				console.log({
                    request: {
						message: `User with ${req.body.email} email already exists...`,
                        type: 'POST',
                        url: req.originalUrl,
                        status: "FAILURE"
                    }});
                return res.status(409).json({
					message: `User with ${req.body.email} email already exists...`,
					request: {
						type: 'POST',
						url: req.originalUrl                    
					} 
                })
            } else {
			//hash a new user password
			bcrypt.hash(password, 10, (error, hash) => {
				if (error) {
					return res.status(500).json({
						serverError: error,
						request: {
							type: 'POST',
							url: req.originalUrl                    
						} 
					});
				} else {
					//Create buffer data for avatar image
					const avatar = { 
						data: new Buffer.from(req.file.buffer, 'base64'), 
						contentType: req.file.mimetype, 
						originalName: req.file.originalname 
					};

					//Create a user document
					const user = new User({
						_id,
						email,
						password: hash,
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
				}
			})
		}
	})
});


/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
///DELETE API endpoint: obtains TOKEN for user login
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////

router.post('/login', (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if(user.length < 1) {
                return res.status(401).json({
                    message: 'Authentification failed',
                    description: 'Incorrect username!'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {				
                if (result) {
                    auth.signUser({
                        email: user[0].email,
                        userId: user[0]._id
                    }, config.secretKey, res, req);
                }else{
					console.log({
						error: 'Authentification failed',						
					});
                    return res.status(401).json({
                        message: 'Authentification failed',
                        error: err,					
						message: "Incorrect password!",
						request: {
							type: 'POST',
							url: req.originalUrl                    
						}  
                    });
                }
            });
		})
        .catch((error) => {
            res.status(500).json({
				serverError: error.message,
				message: "Internal Server Error: Failed to authenticate...",
				request: {
					type: 'POST',
					url: req.originalUrl                    
				}  
			});
        });
});


/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
///DELETE API endpoint: deletes user document by ID
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.deleteOne({_id: id})
        .exec()
        .then(doc => {
            //SUCCESS:
            console.log({
                request: {
                type: "DELETE",
                url: req.originalUrl,
                status: "SUCCESS",
                },
            });
            if(doc.deletedCount === 1){
                res.status(200).json({
					message: `SUCCESS! User ${req.body.email} was deleted`,
					deletedUser: doc, 
					deletedCount: doc.deletedCount,                   
					request: {
						type: 'DELETE',
						url: req.originalUrl                    
					}    
				});        
            }else{
                res.status(400).json({
                    error: `Error: (Hint: User with id ${req.params.userId} was valid, but seems like not found in the database.`,
                    request: {
                        type: 'DELETE',
                        url: req.originalUrl                    
                    }    
                })
            }

        }).catch((error)=>{ 
            res.status(400).json({
				err,
				message: `Failed to delete user record registered. (Hint: the user id format could be INVALID; thus, not found in the database...)`, 
				isIdValid: mongoose.Types.ObjectId.isValid(id),
                serverError: error.message,
				request: {
				type: "DELETE",
				url: req.originalUrl,
				},
			});
        });
    })


module.exports = router;