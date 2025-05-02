const mongoose = require('mongoose');
const express = require('express');
const Sensor = require('../models/sensor');
const auth = require('../auth/authentication');
const jwt = require('jsonwebtoken');
const config = require('../auth/config');
const router = express.Router();


//Routers

/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
// GET endpoint: get ALL sensor documents/records
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
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
		else{
			Sensor
			.find()
			.populate('calibrations')
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
					message: `Successfully fetched ${docs.length} sensor record(s)`,
					collectionName: "sensors",
					payload: docs.map(doc => {                    
						return {
							_id: doc._id,
							calibrations: doc.calibrations,
							EID: doc.EID,
							type: doc.type,                    
							calibrationPriority: doc.calibrationPriority,
							calibrationFrequency: doc.calibrationFrequency,
							calibratedBy: doc.calibratedBy,
							capacityRange: doc.capacityRange,
							location: doc.location,
							description: doc.description,                        
							comment: doc.comment,
							quantity: doc.quantity,
							model: doc.model,
							manufacturer: doc.manufacturer,
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
					"Failure: Sensor documents were not fetched... Something went wrong",
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
// GET endpoint: get a sensor record by ID
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
router.get('/:sensorId', (req, res, next) => {
    const id = req.params.sensorId;
    Sensor.findById(id)
        .populate('calibrations')
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
                    sensor: doc,
                    request: {
                        type: 'GET',
                        url: req.originalUrl                    
                    }  
                });
            } else {
				console.log({
					request: {
						message: "Failed to fetch sensor record by ID. Most likely the document ID is not valid.",
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
				message: "Failure: Unable to fetch sensor records...",
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
//PATCH endpoint: update PARTIALLY existing sensor record/document by ID
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
router.patch("/:sensorId", (req, res, next) => {
    const id = req.params.sensorId;
    Sensor.updateOne({ _id: id }, { $set: { ...req.body } })
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
            message: `Sensor record w/ id: '${id}' was Updated.`,
            request: {
                type: "PATCH",
            },
            result,
        });
    })
    .catch((error) => {
        res.status(500).json({
            message: "Failure: Unable to update sensor record...",
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
//POST endpoint: creates a new sensor RECORD MongoDB document
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
router.post('/', (req, res, next) => {
    const _id = new mongoose.Types.ObjectId();

    const {        
        EID,
        type,
        calibrationPriority,
        calibrationFrequency,
        calibratedBy,
        location,
        description,
        capacityRange,
        model,
        comment,
        quantity,
        manufacturer        
    } = req.body;

	//instatiate a new sensor object
    const sensor = new Sensor({
        _id,   
        calibrations:[],   // initializes array to store multiple MongoDB IDs for calibrations docs...         
        EID,
        type,    
        calibrationPriority,
        calibrationFrequency,        
        calibratedBy,        
        location,
        description,
        capacityRange,
        comment,
        model,
        quantity,
        manufacturer        
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
            message: `SUCCESS: Created new sensor: ${result.EID}`,
            result,
            request: {
                type: 'POST',
                url: req.originalUrl
            }
        });
    })
    .catch((error) => {
        res.status(500).json({
            message: "Failed to create a new sensor to Database",
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
///DELETE API endpoint: deletes a sensor record/document by ID
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////

router.delete('/:sensorId', (req, res, next) => {
    const id = req.params.sensorId;
    Sensor.deleteOne({_id: id})
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
					message: `SUCCESS! Sensor ${req.body.description} ${req.body.EID} was deleted.`,
					deletedSensor: {
						id: req.params.sensorId,
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
                error: `Failed to delete sensor ${req.body.EID} with id {${id}}. (Hint: the sensor ${req.body.EID} id {${id}} format is INVALID; thus, not found in the database...)`,  
                serverError: error.message,
                request: {
                    type: 'DELETE',
                    url: req.originalUrl                    
                }                      
            });
        });
    })



module.exports = router;
