const mongoose = require("mongoose");
const express = require("express");
const Dataset = require("../models/dataset");
const router = express.Router();

//Routers


// GET endpoint: get ALL sensor calibration datasets

router.get('/', (req, res, next) => {
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
			}});

		// Client Side Response 
		res.status(200).json({
			message: docs.length === 0 ? `MongoDB collection is EMPTY` : `Successfully fetched ${docs.length} sensor datasets`,
			collectionName: "datasets",
			payload: docs.map(doc => {
				return {
					_id: doc._id,
					sensorId: doc.sensorId,
					sensorDescription: doc.sensorDescription,
					units: doc.units,
					chartTitle: doc.chartTitle,
					chartYLabel: doc.chartYLabel,
					chartXLabel:  doc.chartXLabel,
					calibratorDataset: doc.calibratorDataset.map(item => item),
					sensorDatasets: doc.sensorDatasets.map(set => {
						return {
							seriesDescription: set.seriesDescription,
							calibrationId: set.calibrationId,
							seriesLabel: set.seriesLabel,
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

});



//POST endpoint: creates a new DATASET RECORD MongoDB document
router.post('/', (req, res, next) => {
	const _id = new mongoose.Types.ObjectId();

	const {        
		sensorId, 
		sensorDescription,
		datasetUnits,
		chartTitle,
		chartYLabel,
		chartXLabel,
		calibrationId,
		seriesLabel,
		sensorDatasets,
		seriesDescription,	
		errorPercentLimit,
		errorUpperLimit,
		errorLowerLimit      
	} = req.body;

	console.log(req.body);
   

	const calibrationDataset = new Dataset({
		_id,   
		sensorId, 
		sensorDescription,
		datasetUnits,
		chartTitle,
		chartYLabel: chartYLabel + `, ${datasetUnits}`,
		chartXLabel: chartXLabel + `, ${datasetUnits}`,
		sensorDatasets: [{
			seriesDescription,
			calibrationId,
			seriesLabel,
			dataset: sensorDatasets
		}],
		errorPercentLimit,
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

//POST endpoint: push a new DATASET into array of DATASET MongoDB document

router.patch("/push/:datasetId", (req, res, next) => {
	const id = req.params.datasetId;
	const newDataset = {
		seriesDescription: req.body.seriesDescription,
		calibrationId: req.body.calibrationId,
		seriesLabel: req.body.seriesLabel,
		dataset: req.body.dataset
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
				message: `Dataset record w/ id: '${id}' was updated successfully. A new dataset was push into dataset array`,
				request: {
					type: "PATCH",
				},
				result,
			});
		})
		.catch((error) => {
			res.status(500).json({
				message: "Failure: Unable to update a dataset...",
				isIdValid: mongoose.Types.ObjectId.isValid(id),
				serverError: error.message,
				request: {
					type: "PATCH",
					url: req.originalUrl,
				},
			});
		});
	});


//POST endpoint: push a new DATASET into array of DATASET MongoDB document

router.patch("/pull/:datasetId", (req, res, next) => {
	const id = req.params.datasetId;
	const datasetObjectId = req.body.datasetObjectId;
	
	Dataset.updateOne({ _id: id },
		{ $pull: { sensorDatasets: { _id: datasetObjectId } } })
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
				message: `Dataset record w/ id: '${id}' was updated successfully: dataset '${datasetObjectId}' was pulled out`,
				request: {
					type: "PATCH",
				},
				result,
			});
		})
		.catch((error) => {
			res.status(500).json({
				message: "Failure: Unable to update a dataset...",
				isIdValid: mongoose.Types.ObjectId.isValid(id),
				serverError: error.message,
				request: {
					type: "PATCH",
					url: req.originalUrl,
				},
			});
		});
	});

module.exports = router;