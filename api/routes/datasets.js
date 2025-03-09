const mongoose = require("mongoose");
const express = require("express");
const Dataset = require("../models/dataset");
const router = express.Router();

//Routers

/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
// GET endpoint: get ALL sensor calibration datasets
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
router.get('/', (req, res, next) => {
	Dataset
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
			message: `Successfully fetched ${docs.length} sensor datasets`,
			collectionName: "datasets",
			payload: docs.map(doc => {                    
				return {
					_id: doc._id,
					sensorId: doc.sensorId,
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
					createdAt: doc.createdAt,
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
			"Failure: Sensor datasets documents were not fetched... Something went wrong",
			serverError: error.message,
			request: {
				type: 'GET',
				url: req.originalUrl
			}  
		});
	});

});

module.exports = router;