const mongoose = require("mongoose");
const express = require("express");
const Article = require("../models/article");
const auth = require('../auth/authentication');
const jwt = require('jsonwebtoken');
const config = require('../auth/config');
const router = express.Router();

//Routers

router.get('/', auth.verifyToken, (req, res, next) => {
	jwt.verify(req.token, config.secretKey, (err) => {
		if (err) {			
			console.log({
				errorMessage: err.message,
				request: {
					type: 'GET',
					url: req.originalUrl,
					status: "FAILURE"
				}});
			res.status(403).json({
				authStatus: false,
				err,
				message: 'Your login session is expired or you are not logged in! Sign in again to perform this action...'
			});
		}
		Article.find()
			.then(articles => {
				res.json(articles);
			})
			.catch(err => {
				next(err);
			});
	});
});	



module.exports = router;
