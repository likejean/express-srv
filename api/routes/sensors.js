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
            console.log({
                total: docs.length,
                request: {
                    type: 'GET',
                    url: req.originalUrl,
                    status: "SUCCESS"
                }});
            res.status(200).json({
                message:   `Successfully fetched ${docs.length} sensors`,
                collectionName: "sensors",
                payload: docs.map(doc => {                    
                    return {
                        _id: doc._id,
                        calibrations: doc.calibrations,
                        EID: doc.EID,
                        type: doc.type,    
                        priority: doc.calibrationPriority,                        
                        calibrationPriority: doc.calibrationPriority,
                        calibrationFrequency: doc.calibrationFrequency,
                        calibratedBy: doc.calibratedBy,
                        location: doc.location,
                        description: doc.description,
                        capacityRange: doc.capacityRange,
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


// GET endpoint: get sensor by id
router.get('/:sensorId', (req, res, next) => {
    const id = req.params.sensorId;
    Sensor.findById(id)
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
                        message: 'Invalid Entry',
                        type: 'GET',
                        url: req.originalUrl,
                        status: "FAILURE"
                    }});
                return res.status(400).json({
                    message: 'Invalid Entry',
                    request: {
                        type: 'GET',
                        url: req.originalUrl                    
                    }  
                });
            }
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

//PATCH endpoint: updating PARTIALLY existing SENSOR document
router.patch('/:sensorId', (req, res, next) => {
    const id = req.params.sensorId;
    const {        
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

    Sensor.updateOne({_id: id}, {
        $set: {
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
            quantity,
            manufacturer
        }
    })
    .exec()
    .then(result => {
        console.log('patch_result', result);
        res.status(200).json({
            message: `Sensor w/ id: '${id}' was Updated.`,
            request: {
                type: 'PATCH'
            },
            result
        });
    })
    .catch(err => {
        res.status(500).json({
            message: "Failure: Unable to update sensor data...",
            error: err,
            request: {
                type: 'PATCH',
                url: req.originalUrl                    
            }  
        });
    });
});


//POST endpoint: creates a new SENSOR MongoDB document

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
        console.log({url: req.originalUrl, type: 'POST', status: "SUCCESS"});
        res.status(200).json({
            message: `SUCCESS: Created new sensor: ${result.EID}`,
            result,
            request: {
                type: 'POST',
                url: req.originalUrl
            }          
           
        });
    })
    .catch(() => {
        res.status(500).json({
            message: "Failed to create a new sensor to Database",
            request: {
                type: 'POST',
                url: req.originalUrl                    
            }  
        });
    });


});




/// API endpoint: delete a single sensor by MongoDB id
/// this client reques MUST HAVE the following body! 
//{
//    "calibrations":[
//      '4ed3ede8844f0f351100000c',
//      '4ed3ede8844f0f351100000a',
//      '4ed3ede8844f0f351100000d,
//       ......
//       ......
//    ],
//    "description": "Load Cell Transducer",
//    "EID": "EIDXXX"      
///////////////EAXMPLE: /////////////////////////////////////////
//const ids =  [
//    '4ed3ede8844f0f351100000c',
//    '4ed3f117a844e0471100000d', 
//   '4ed3f18132f50c491100000e',
//];
//}   Model.find().where('_id').in(ids).exec((err, records) => {});

router.delete('/:sensorId', (req, res, next) => {
    const id = req.params.sensorId;
    Sensor.deleteOne({_id: id})
        .exec()
        .then(doc => {
            if(doc.deletedCount === 1){

                //If a sensor document was found, then find associated calibration procedure(s) by specified id's
                //in req.body.calibrations array and remove sensor ID from all FOUND cals.sensor[i] arrays
                //NOTE: could be multiple calibrations found!
                Calibration.find().where('_id').in(req.body.calibrations).exec()
                .then(cals => { 
                    for (let i = 0; i < cals.length; i++) {
                        for (let j = 0; j < cals[i].sensors.length; j++) {
                            if (cals[i].sensors[j].toString() === id) {
                                cals[i].sensors.splice(j, 1);   //use splice() method to mutate existing arrays in cal documents
                                break;
                            }
                        }                                
                    }
                    const saveCals = cals.map(cal => cal.save());
                    //resolves all async promises
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
