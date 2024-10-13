const mongoose = require('mongoose');
const express = require('express');
const Sensor = require('../models/sensor');
const Calibration = require('../models/calibration');
const router = express.Router();



//Routers
// GET endpoint: get ALL sensors
router.get('/', (req, res, next) => {
    Sensor
        .find()
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                sensors: docs.map(doc => {                    
                    return {
                        procedureName: doc.procedureName,
                        EID: doc.EID,
                        type: doc.type,    
                        priority: doc.priority,
                        calibrationDate: doc.calibrationDate,
                        expirationDate: doc.expirationDate,
                        calibrationExtended: doc.calibrationExtended,
                        maxCalibrationExtension: doc.maxCalExtension,
                        calibratedBy: doc.calibratedBy,
                        location: doc.location,
                        description: doc.description,
                        calibrationRange: doc.calibrationRange,
                        comment: doc.comment,
                        units: doc.units,
                        manufacturer: doc.manufacturer,
                        createdAt: doc.createdAt,
                        request: {
                            type: 'GET',
                            url: req.originalUrl                    
                        }  
                    };                    
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Failure: Unable to fetch sensor data...",
                error: err
            });
        });
});


//POST endpoint: create a new SENSOR

router.post('/', (req, res, next) => {
    const _id = new mongoose.Types.ObjectId();

    const {
        procedure,
        createdAt,
        EID,
        type,
        calibrationPriority,
        calibrationFrequency,
        lastCalibrationDate,
        dueCalibrationDate,
        calibrationExtended,
        calibratedBy,
        maxCalibrationExtension,
        location,
        description,
        calibrationRange,
        comment,
        units,
        manufacturer        
    } = req.body;

    const sensor = new Sensor({
        _id,   
        procedure,
        createdAt,     
        EID,
        type,    
        calibrationPriority,
        calibrationFrequency,
        lastCalibrationDate,
        dueCalibrationDate,
        calibrationExtended,
        calibratedBy,
        maxCalibrationExtension,
        location,
        description,
        calibrationRange,
        comment,
        units,
        manufacturer        
    });
   
    sensor.save()
        .then(result => {  
            //// How to add a document to database collection by reference         
            Calibration.findOne({procedureName: req.body.procedure})
                .then((doc)=>{
                    doc.sensors.push(sensor._id);
                    doc.save()
                    .then(() => console.log(`Sensor ${sensor.description} ${sensor.EID} added to ${req.body.procedure} procedure`))
                    .catch(() => {
                        res.status(500).json({
                            error: "Sensor was not saved to procedure"
                        });
                    });
                })
                .catch((err)=>{
                    res.status(500).json({
                        error: `Failed to find the following procedure: ${procedureName}...`,
                        err
                    });
                });
           
            ///
            res.status(201).json({
                message: `SUCCESS: ${result.description} sensor with ${result.EID} was added...`,                
                addedSensor: {
                    id: result._id,
                    EID: result.EID,
                    calibrationPrinciples: result.calibrationPrinciples,
                    description: result.description,
                    calibrationDate: result.calDate,
                    expirationDate: result.expDate,
                    procedureName: result.procedureName
                },
                request: {
                    type: 'POST',
                    url: req.originalUrl                    
                }    
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "Failed to add Sensor to Calibration Database",
                err
            });
        });
});

/// API endpoint: delete a single sensor by MongoDB id
router.delete('/:sensorId', (req, res, next) => {
    const id = req.params.sensorId;
    Sensor.deleteOne({_id: id})
        .exec()
        .then(doc => {
            if(doc.deletedCount === 1){
                //If a sensor document was found, then find associated calibration procedure and remove it from its associated sensor array
                Calibration.findOne({procedureName: req.body.procedure})
                .then(cal => {                    
                    for (let i = 0; i < cal.sensors.length; i++) {
                        if (cal.sensors[i].toString() === id) {
                            cal.sensors.splice(i, 1);
                            break;
                        }
                    }
                    cal.save()  //save updated calibration procedure document
                    .then(() => {                        
                        res.status(200).json({
                            message: `SUCCESS! Sensor ${req.body.description} ${req.body.EID} was deleted from calibration procedure ${req.body.procedure}`,
                            deletedSensor: {
                                id: req.params.sensorId,
                                EID: req.body.EID,
                                description: req.body.description
                            },                    
                            request: {
                                type: 'DELETE',
                                url: req.originalUrl                    
                            }    
                        });                           
                    }).catch(err => {
                        throw new Error(err);
                    })
                }).catch(() => {
                    res.status(500).json({
                        error: "Internal Server Error: Sensor was not deleted...",
                        request: {
                            type: 'DELETE',
                            url: req.originalUrl                    
                        }    
                    });
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

        }).catch(()=>{                
            res.status(400).json({
                error: `Failed to delete sensor ${req.body.EID} with id {${id}}. (Hint: the sensor ${req.body.EID} id {${id}} format is INVALID; thus, not found in the database...)`,  
                request: {
                    type: 'DELETE',
                    url: req.originalUrl                    
                }                      
            });
        });
    })



module.exports = router;
