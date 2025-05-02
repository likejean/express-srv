const mongoose = require("mongoose");
const express = require("express");
const Dataset = require("../models/dataset");
const auth = require('../auth/authentication');
const jwt = require('jsonwebtoken');
const config = require('../auth/config');
const router = express.Router();

//Routers


// GET endpoint: get ALL sensor calibration datasets

router.get('/', auth.verifyToken, (req, res, next) => {
	jwt.verify(req.token, config.secretKey, (err) => {
		if (err) {
			console.log({
				errorMessage: err.message,
				request: {
					type: 'GET',
					url: req.originalUrl,
					status: "FALURE"
				}});
			res.status(403).json({
				authStatus: false,
				err,
				message: 'Your login session is expired or you are not logged in! Sign in again to perform this action...'
			});
		}
		else{
			Dataset
			.find()
			.exec()
			.then(docs => {
				//Server Side Terminal Logs
				console.log({
					total: docs.length,
					request: {
						type: 'GET',
						url: req.originalUrl,
						status: "SUCCESS"
					}
				});

				// Client Side Response 
				res.status(200).json({
					message: docs.length === 0 ? `MongoDB collection is EMPTY` : `Successfully fetched ${docs.length} sensor datasets`,
					collectionName: "datasets",
					payload: docs.map(doc => {
						return {
							_id: doc._id,
							sensorId: doc.sensorId,
							sensorDescription: doc.sensorDescription,
							errorLimit: doc.errorLimit,
							datasetUnits: doc.datasetUnits,
							chartTitle: doc.chartTitle,
							chartYLabel: doc.chartYLabel,
							chartXLabel:  doc.chartXLabel,
							sensorDatasets: doc.sensorDatasets.map(set => {
								return {
									plotId: set.plotId,
									calibrationId: set.calibrationId,
									calibrationName: set.calibrationName,
									seriesLabel: set.seriesLabel,
									seriesDescription: set.seriesDescription,
									dataset: set.dataset.map(val => val)
								}
							}),	
							errorUpperLimit: doc.errorUpperLimit.map(val => val),
							errorLowerLimit: doc.errorLowerLimit.map(val => val),
							createdAt: doc.createdAt
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
					message: "Failure: Sensor datasets documents were not fetched... Something went wrong",
					serverError: error.message,
					request: {
						type: 'GET',
						url: req.originalUrl
					}  
				});
			});
		}
	});
	

});


/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
// GET endpoint: get a chart dataset record by ID
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
router.get('/:chartId', (req, res, next) => {
	const id = req.params.chartId;
	Dataset.findById(id)
		.populate('sensorId')
		.exec()
		.then(doc => {
			console.log({
				request: {
					type: 'GET',
					url: req.originalUrl,
					status: "SUCCESS"
				}});
			//To handle non-existing id error, but correct format...
			if (doc) {
				console.log({
					request: {
						type: 'GET',
						url: req.originalUrl,
						status: "SUCCESS"
					}});
				return res.status(200).json({
					chart: doc,
					request: {
						type: 'GET',
						url: req.originalUrl                    
					}  
				});
			} else {
				console.log({
					request: {
						message: "Failed to fetch dataset record by ID. Most likely the document ID is not valid.",
						isIdValid: mongoose.Types.ObjectId.isValid(id),
						type: "GET",
						url: req.originalUrl,
						status: "FAILURE",
					},
				});
				return res.status(400).json({
					message: "Invalid Entry",
					request: {
						type: "GET",
						url: req.originalUrl,
					},
				});
			}
		})
		.catch((error) => {
			res.status(500).json({
				message: "Failure: Unable to fetch dataset records...",
				serverError: error.message,
				request: {
				type: "GET",
				url: req.originalUrl,
				},
			});
		});
	});


/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
//PATCH endpoint: update PARTIALLY existing chart record/document by ID: (title, xLabel, yLabel)
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
router.patch("/:chartId", (req, res, next) => {
	const id = req.params.chartId;
	Dataset.updateOne({ _id: id }, { $set: { ...req.body } })
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
			message: `Chart record w/ id: '${id}' was Updated.`,
			request: {
				type: "PATCH",
			},
			result,
		});
	})
	.catch((error) => {
		res.status(500).json({
			message: "Failure: Unable to update dataset chart record...",
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
//POST endpoint: creates a new Chart RECORD MongoDB document
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
router.post('/', (req, res, next) => {
	const _id = new mongoose.Types.ObjectId();

	const {        
		sensorId, 
		sensorDescription,
		datasetUnits,
		chartTitle,
		chartYLabel,
		chartXLabel,
		sensorDatasets,
		errorLimit,
		errorUpperLimit,
		errorLowerLimit      
	} = req.body;

	const calibrationDataset = new Dataset({
		_id,   
		sensorId, 
		sensorDescription,
		datasetUnits,
		chartTitle,
		chartYLabel: chartYLabel + `, [${datasetUnits}]`,
		chartXLabel: chartXLabel + `, [${datasetUnits}]`,
		sensorDatasets,
		errorLimit,
		errorUpperLimit,
		errorLowerLimit       
	});  
	
	calibrationDataset
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
			message: `SUCCESS: Created a new dataset`,
			result,
			request: {
				type: 'POST',
				url: req.originalUrl
			}
		});
	})
	.catch((error) => {
		res.status(500).json({
			message: "Failed to create a new dataset to Database",
			serverError: error.message,
			request: {
				type: 'POST',
				url: req.originalUrl                    
			}  
		});
	});
});





/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
//PATCH endpoint: pushes a new dataset into Chart MongoDB document
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////

router.patch("/push/:chartId", (req, res, next) => {
	const id = req.params.chartId;
	const newDataset = {
		seriesDescription: req.body.seriesDescription,
		calibrationId: req.body.calibrationId,
		seriesLabel: req.body.seriesLabel,
		dataset: req.body.dataset,
		calibrationName: req.body.calibrationName,
		plotId: req.body.plotId
	};
	Dataset.updateOne({ _id: id },
		{ $push: { sensorDatasets: newDataset } })
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
				message: `Chart w/ id: '${id}' was updated successfully. A new dataset was push into its plot array`,
				request: {
					type: "PATCH",
				},
				result,
			});
		})
		.catch((error) => {
			res.status(500).json({
				message: "Failure: Unable to update a chart...",
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
///PATCH API endpoint: pulls dataset item by ID from the array of datasets in the chart document
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
router.patch("/pull/:chartId", (req, res, next) => {
	const id = req.params.chartId;
	const datasetId = req.body.datasetId;

	Dataset.updateOne({ _id: id },
		{ $pull: { sensorDatasets: { _id: datasetId } } })
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
				message: `Chart document w/ id: '${id}' was updated successfully: dataset '${datasetId}' was pulled out`,
				request: {
					type: "PATCH",
				},
				result,
			});
		})
		.catch((error) => {
			res.status(500).json({
				message: "Failure: Unable to pull a dataset from chart...",
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
///DELETE API endpoint: deletes chart document by ID
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
router.delete('/:chartId', (req, res, next) => {
	const id = req.params.chartId;
	Dataset.deleteOne({_id: id})
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
					message: `SUCCESS! Chart document for sensor ${req.body.sensorDescription}: ${req.body.sensorEID} was deleted from database`,
					deletedDataset: {
						id,
						sensorDescription: `${req.body.sensorDescription}: ${req.body.sensorEID}`
					}, 
					deletedCount: doc.deletedCount,                   
					request: {
						type: 'DELETE',
						url: req.originalUrl                    
					}    
				});        
			}else{
				res.status(400).json({
					error: `Error: (Hint: chart document id ${id} was valid, but seems like not found in the database.`,
					request: {
						type: 'DELETE',
						url: req.originalUrl                    
					}    
				})
			}

		}).catch((error)=>{ 
			res.status(400).json({
				err,
				message: `Failed to delete chart dataset with id: ${id}. (Hint: the document id format is INVALID; thus, not found in the database...)`, 
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