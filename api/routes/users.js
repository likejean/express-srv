const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../auth/authentication");
const config = require("../auth/config");
const jwt = require('jsonwebtoken');
var multer = require("multer");

//const avatarPath = path.join(__dirname + '/../../public/img/avatars');
///The memory storage engine stores the files in memory as Buffer objects. It dumps data after request ends.
const storage = multer.memoryStorage();

// my mimetype check here
const fileFilter = (req, file, cb) => {
	if (!file.mimetype.includes("image")) {
		return cb(new Error("this file not an image"));
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
router.get("/", auth.verifyToken, (req, res, next) => {
	jwt.verify(req.token, config.secretKey, (err) => {
		if (err) {
			console.log({
				errorMessage: err.message,
				request: {
					type: "GET",
					url: req.originalUrl,
					status: "FAILURE",
				},
			});
			return res.status(403).json({
				authStatus: false,
				err,
				message:
					"Your login session is expired or you are not logged in! Sign in again to perform this action...",
			});
		} else {
			User.find()
			.exec()
			.then((docs) => {
				console.log({
					total: docs.length,
					request: {
					type: "GET",
					url: req.originalUrl,
					status: "SUCCESS",
					},
				});
				res.status(200).json({
					message: `Successfully fetched ${docs.length} user record(s)`,
					collectionName: "users",
					payload: docs.map((doc) => {
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
						type: "GET",
						url: req.originalUrl,
						},
					};
					}),
					total: docs.length,
					request: {
					type: "GET",
					url: req.originalUrl,
					},
				});
				})
				.catch((error) => {
				res.status(500).json({
					message: "Failed to fetch user documents... Something went wrong",
					serverError: error.message,
					request: {
					type: "GET",
					url: req.originalUrl,
					},
				});
			});
		}
	});
	
});

/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
// GET endpoint: get a user record by ID
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
router.get("/:userId", async (req, res) => {
	try {
		const user = await User.findById(req.params.userId);
		if (!user) {
		console.log({
			request: {
			message:
				"Failed to fetch user by ID (most likely document id not valid)",
			isIdValid: mongoose.Types.ObjectId.isValid(req.params.userId),
			type: "GET",
			url: req.originalUrl,
			status: "FAILURE",
			},
		});
		return res.status(404).send("User not found.");
		}
		console.log({
		request: {
			type: "GET",
			url: req.originalUrl,
			status: "SUCCESS",
		},
		});

		return res.status(200).json({
		user,
		request: {
			type: "GET",
			url: req.originalUrl,
		},
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



/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
//PATCH endpoint: update PARTIALLY existing user record/document by ID
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
router.patch("/:userId", (req, res, next) => {
    const id = req.params.userId;
    User.updateOne({ _id: id }, { $set: { ...req.body } })
    .exec()
    .then((result) => {
        console.log({
            request: {
                type: "PATCH",
                url: req.originalUrl,
                status: "SUCCESS",
            },
        });
        res.status(200).json({
            message: `User record w/ id: '${id}' was Updated.`,
            request: {
                type: "PATCH",
            },
            result,
        });
    })
    .catch((error) => {
        res.status(500).json({
            message: "Failure: Unable to update user record...",
            isIdValid: mongoose.Types.ObjectId.isValid(id),
            serverError: error.message,
            request: {
                type: "PATCH",
                url: req.originalUrl,
            },
        });
    });
});



/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
//PATCH endpoint: update user password for user found by ID
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////

router.patch("/updatePassword/:userId",
	async (req, res) => {
		const { email, oldPassword, newPassword } = req.body;
		try {
			const user = await User.findOne({ email });

			if (!user) {
				console.log({
					error: "Authentification failed: Invalid user email!",
				});
				return res.status(401).json({
						errorStatusCode: 1,
						errorMessage: "Authentification failed: Invalid user email!",
						error,
						request: {
						type: "POST",
						url: req.originalUrl,
					},
				});
			}

			const isMatch = await bcrypt.compare(oldPassword, user.password);

			if (!isMatch) {
				console.log({
					error: "Authentification failed: Invalid old password entered!!",
				});
				return res.status(401).json({
						errorStatusCode: 2,
						errorMessage: "Authentification failed: Invalid old password entered!",
						error,
						request: {
						type: "POST",
						url: req.originalUrl,
					},
				});
			}

			
			// Hash and save a new password
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(newPassword, salt);
			user.password = hashedPassword;
			await user.save();

			res.status(200).json({ message: 'Password changed successfully' });
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: 'Internal server error...' 
			});
		}
	}
);


/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
//PATCH endpoint: update image for user avatar found by ID
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
router.patch("/updateAvatar/:userId",  upload.single("avatar"),
	async (req, res) => {
		try {
			const user = await User.findById(req.params.userId);

			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			if (req.file) {
				user.image.avatar.data = req.file.buffer;
				user.image.avatar.contentType = req.file.mimetype;
				user.image.avatar.original = req.file.originalname;
				user.image.title = req.body.title;
				user.image.description = req.body.description;
			}

			const result = await user.save();
			console.log({
				request: {
				type: "PATCH",
				url: req.originalUrl,
				status: "SUCCESS",
				},
			});
			res.status(200).json({
				message: `Avatar image updated successfully for a user: {email: ${result.email}, username: ${result.username}}`,
				result,
				request: {
				type: "PATCH",
				},
			});
		} catch (error) {
			res.status(500).json({
				message: "Failure: Unable to update user avatar image...",
				serverError: error.message,
				request: {
				type: "PATCH",
				url: req.originalUrl,
				},
			});
		}
	}
);




/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
//POST endpoint: creates a new user RECORD w/ avatar image (base64 buffer-type field)
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
router.post("/register", upload.single("avatar"), (req, res) => {
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
		description,
	} = req.body;

	//Check if a user exists with the current req.body.email
	User.find({ email })
		.exec()
		.then((user) => {
		//Throw error if a user already exists with the current req.body.email
		if (user.length >= 1) {
			console.log({
				request: {
					message: `User with ${req.body.email} email already exists...`,
					type: "POST",
					url: req.originalUrl,
					status: "FAILURE",
				},
			});
			return res.status(409).json({
				message: `User with ${req.body.email} email already exists...`,
				request: {
					type: "POST",
					url: req.originalUrl,
				},
			});
		} else {

			//hash a new user password
			const saltRounds = 10;
			bcrypt.genSalt(saltRounds, (error, salt) => {
				if (error) throw error;				
				bcrypt.hash(password, salt, (error, hash) => {
					if (error) {
						return res.status(500).json({
							serverError: error,
							request: {
								type: "POST",
								url: req.originalUrl,
							}
						});
					} else {
						//Create buffer data for avatar image
						const avatar = {
							data: new Buffer.from(req.file.buffer, "base64"),
							contentType: req.file.mimetype,
							originalName: req.file.originalname,
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
								avatar,
							},
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
									type: "POST",
									url: req.originalUrl,
								},
							});
						})
						.catch((error) => {
								res.status(500).json({
								serverError: error.message,
								message: "Failed to save avatar image in the database",
								request: {
									type: "POST",
									url: req.originalUrl,
								},
							});
						});
					}
				});
			});
		}
    });
});


router.post("/verifyToken", auth.verifyToken, (req, res, next) => {
	jwt.verify(req.token, config.secretKey, (err) => {
		if (err) {			
			console.log({
				errorMessage: err.message,				
				request: {
					type: 'POST',
					url: req.originalUrl,
					status: "FAILURE"
				}});
			res.status(403).json({
				authStatus: "Forbidden",
				token: req.token,
				tokenValid: false,
				err,
				message: 'Your login session is expired or you are not logged in! Sign in again to perform this action...'
			});
		}else{
			res.status(200).json({
				token: req.token,
				tokenValid: true
			});
		}		
	});	
})





/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
///DELETE API endpoint: obtains TOKEN for user login
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
router.post("/login", (req, res, next) => {
	console.log(req.body)
	const email = req.body.email;
	User.find({ email })
		.exec()
		.then((user) => {
			if (user.length < 1) {
				console.log({
					error: "Authentification failed: Invalid user email!",
				});
				return res.status(401).json({			
					errorStatusCode: 1,
					errorMessage: "Authentification failed: Invalid user email!",
					request: {
						type: "POST",
						url: req.originalUrl,
					}
				});
			}
			bcrypt.compare(req.body.password, user[0].password, (error, result) => {
				if (result) {
					auth.signUser({email: user[0].email, userId: user[0]._id}, config.secretKey, res, req);
				} else {
					console.log({
						error: "Authentification failed: Invalid user password!",
					});
					return res.status(401).json({
							errorStatusCode: 2,
							errorMessage: "Authentification failed: Invalid user password!",
							error,
							request: {
							type: "POST",
							url: req.originalUrl,
						},
					});
				}
			});
		})
		.catch((error) => {
			res.status(500).json({
				errorStatusCode: 3,
				errorMessage: error.message,
				request: {
				type: "POST",
				url: req.originalUrl,
			},
		});
    });
});

/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
///DELETE API endpoint: deletes user document by ID
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////

router.delete("/:userId", (req, res, next) => {
	const id = req.params.userId;
	User.deleteOne({ _id: id })
		.exec()
		.then((doc) => {
		//SUCCESS:
		console.log({
			request: {
			type: "DELETE",
			url: req.originalUrl,
			status: "SUCCESS",
			},
		});
		if (doc.deletedCount === 1) {
			res.status(200).json({
			message: `SUCCESS! User ${req.body.email} was deleted`,
			deletedUser: doc,
			deletedCount: doc.deletedCount,
			request: {
				type: "DELETE",
				url: req.originalUrl,
			},
			});
		} else {
			res.status(400).json({
				error: `Error: (Hint: User with id ${req.params.userId} was valid, but seems like not found in the database.`,
				request: {
					type: "DELETE",
					url: req.originalUrl,
				},
			});
		}
		})
		.catch((error) => {
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
});

module.exports = router;
