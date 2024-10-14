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
                        calibrations: doc.calibrations,
                        EID: doc.EID,
                        type: doc.type,    
                        priority: doc.calibrationPriority,
                        lastCalibrationDate: doc.lastCalibrationDate,
                        dueCalibrationDate: doc.dueCalibrationDate,
                        calibrationExtended: doc.calibrationExtended,
                        maxCalibrationExtension: doc.maxCalibrationExtension,
                        calibratedBy: doc.calibratedBy,
                        location: doc.location,
                        description: doc.description,
                        capacityRange: doc.capacityRange,
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
                error: err,
                request: {
                    type: 'GET',
                    url: req.originalUrl                    
                }  
            });
        });
});


//POST endpoint: create a new SENSOR

router.post('/', (req, res, next) => {
    const _id = new mongoose.Types.ObjectId();

    const {
        calibrations,   // NOTE! this array stores values in the following format {0.0-10000.0kips} from client's request body
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
        capacityRange,
        comment,
        units,
        manufacturer        
    } = req.body;

    const sensor = new Sensor({
        _id,   
        calibrations: [],   // initializes this array to store MongoDB ids, not procedure names...
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
        capacityRange,
        comment,
        units,
        manufacturer        
    });

    Calibration.find().where('procedureName').in(calibrations).exec()
    .then(cals => {        
        if(cals.length > 0){
            for (let i = 0; i < cals.length; i++) {
                cals[i].sensors.push(sensor._id);
                sensor.calibrations.push(cals[i]._id);                                
            }
            const saveCals = cals.map(cal => cal.save());
            Promise.all(saveCals)
            .then(() => {
                sensor.save().then(result => {
                    res.status(201).json({
                        message: `SUCCESS: Sensor was save and calibrations procedures were updated per sensor references...`,   
                        sensor: result,
                        request: {
                            type: 'POST',
                            url: req.originalUrl                    
                        }   
                    });
                });  
            })
            .catch(() => {
                res.status(500).json({
                    calibrations,
                    error: "Internal Server Error: Sensor references were not saved to calibration documents",
                    request: {
                        type: 'POST',
                        url: req.originalUrl                    
                    }
                });
            })     
        } else {
            console.log('Calibraion procedures were not found');
            res.status(400).json({
                cals,
                error: `Failed to find specified calibration procedures for this sensor...`,               
                request: {
                    type: 'POST',
                    url: req.originalUrl                    
                }  
            });
        }
    })
    .catch(() => {
        res.status(500).json({
            error: "Internal Server Error: Sensor was not saved to database",
            request: {
                type: 'POST',
                url: req.originalUrl                    
            }
        });
    })
});




/// API endpoint: delete a single sensor by MongoDB id
router.delete('/:sensorId', (req, res, next) => {
    const id = req.params.sensorId;
    Sensor.deleteOne({_id: id})
        .exec()
        .then(doc => {
            if(doc.deletedCount === 1){

                //If a sensor document was found, then find associated calibration procedure and remove it from its associated sensor array
                Calibration.find().where('_id').in(req.body.calibrations).exec()
                .then(cals => { 
                    for (let i = 0; i < cals.length; i++) {
                        for (let j = 0; j < cals[i].sensors.length; j++) {
                            if (cals[i].sensors[j].toString() === id) {
                                cals[i].sensors.splice(j, 1);
                                break;
                            }
                        }                                
                    }
                    const saveCals = cals.map(cal => cal.save());
                    Promise.all(saveCals)
                    .then(() => {                        
                        res.status(200).json({
                            message: `SUCCESS! Sensor ${req.body.description} ${req.body.EID} was deleted from calibration procedure`,
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
