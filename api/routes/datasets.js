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
							datasetId: set.datasetId,
							calibrationId: set.calibrationId,
							chartLegend: set.chartLegend,
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
		units,
		chartTitle,
		chartYLabel,
		chartXLabel,
		calibratorDataset,
		datasetId,
		calibrationId,
		chartLegend,
		dataset,
		hysteresis,	
		errorPercentLimit,
		errorUpperLimit,
		errorLowerLimit      
	} = req.body;
   

	const sensor = new Dataset({
		_id,   
		sensorId, 
		sensorDescription,
		units,
		chartTitle,
		chartYLabel,
		chartXLabel,		
		datasetId,
		calibrationId,
		calibratorDataset,
		sensorDatasets: [{
			datasetId,
			calibrationId,
			chartLegend,
			dataset,
			hysteresis
		}],
		errorPercentLimit,
		errorUpperLimit,
		errorLowerLimit       
	});  
	
	sensor
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

module.exports = router;