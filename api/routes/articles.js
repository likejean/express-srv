const mongoose = require("mongoose");
const express = require("express");
const Article = require("../models/article");
const auth = require('../auth/authentication');
const jwt = require('jsonwebtoken');
const config = require('../auth/config');
const router = express.Router();
//Routers


////////////COMPLETED and TESTED////////////////////////////////
////////////COMPLETED and TESTED////////////////////////////////
// GET endpoint: retrieve all articles
////////////COMPLETED and TESTED////////////////////////////////
////////////COMPLETED and TESTED////////////////////////////////
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


////////////COMPLETED and TESTED////////////////////////////////
////////////COMPLETED and TESTED////////////////////////////////
// POST endpoint: create new article record
////////////COMPLETED and TESTED////////////////////////////////
////////////COMPLETED and TESTED////////////////////////////////
router.post('/', auth.verifyToken, (req, res, next) => {
	jwt.verify(req.token, config.secretKey, (err) => {
		if (err) {			
			console.log({
				errorMessage: err.message,
				request: {
					type: 'POST',
					url: req.originalUrl,
					status: "FAILURE"
				}
			});
			res.status(403).json({
				authStatus: false,
				err,
				message: 'Your login session is expired or you are not logged in! Sign in again to perform this action...'
			});
		} else {
			const _id = new mongoose.Types.ObjectId();
			const {
				procedureId,
				title,
				content,
				branch,
				formula,
				imageLink,
				resourceLink,
			} = req.body;

			const article = new Article({
				_id,
				procedureId,
				title,
				content,
				branch,
				formula,
				imageLink,
				resourceLink,
			});

			article
			.save()
			.then(result => {
			console.log({
				request: {
					type: "POST",
					url: req.originalUrl,
					status: "SUCCESS",
				},
			});
			res.status(200).json({
				message: `SUCCESS: Created new article: ${result.title}`,
				result,
				request: {
					type: 'POST',
					url: req.originalUrl
				}
			});
		})
		.catch((error) => {
			res.status(500).json({
				message: "Failed to create a new article to Database",
				serverError: error.message,
				request: {
					type: 'POST',
					url: req.originalUrl                    
				}  
			});
		});
	}});

});

////////////COMPLETED and TESTED////////////////////////////////
////////////COMPLETED and TESTED////////////////////////////////
// DELETE endpoint: delete an article by ID
////////////COMPLETED and TESTED////////////////////////////////
////////////COMPLETED and TESTED////////////////////////////////
router.delete('/:articleId', auth.verifyToken, (req, res, next) => {	
	jwt.verify(req.token, config.secretKey, (err) => {
		if (err) {			
			console.log({
				errorMessage: err.message,	
			});
			res.status(403).json({
				authStatus: false,
				err,
				message: 'Your login session is expired or you are not logged in! Sign in again to perform this action...'
			});
		} else {
			const id = req.params.articleId;
			console.log(`Deleting article with id: ${id}`);
			Article.deleteOne({_id: id})
			.exec()
			.then(doc => {
				if(doc.deletedCount === 1){
					//SUCCESS:
					console.log({
						request: {
						type: "DELETE",
						url: req.originalUrl,
						status: "SUCCESS",
						},
					});
					res.status(200).json({
						message: `SUCCESS! Article ${req.body.description} ${req.body.EID} was deleted.`,
						deletedArticle: {
							id: req.params.articleId,
							EID: req.body.EID,
							description: req.body.description
						}, 
						deletedCount: doc.deletedCount,                   
						request: {
							type: 'DELETE',
							url: req.originalUrl                    
						}    
					});        
				}else{
					res.status(400).json({
						error: `Error: (Hint: the sensor ${req.body.EID} id {${id}} is valid, but seems like not found in the database.`,
						request: {
							type: 'DELETE',
							url: req.originalUrl                    
						}    
					})
				}

			}).catch((error)=>{                
				res.status(400).json({
					error: `Failed to delete article ${req.body.EID} with id {${id}}. (Hint: the article ${req.body.EID} id {${id}} format is INVALID; thus, not found in the database...)`,  
					serverError: error.message,
					request: {
						type: 'DELETE',
						url: req.originalUrl                    
					}                      
				});
			});
		}
	});
});
    
	
module.exports = router;
