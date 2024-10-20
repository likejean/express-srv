const mongoose = require('mongoose');
const express = require('express');
const Sensor = require('../models/sensor');
const Calibration = require('../models/calibration');
const router = express.Router();

class calibrationProcedure {
    constructor(
        calibrationProcedureId, 
        calibrationProcedureName,
        lastCalibrationDate, 
        dueCalibrationDate,
        calibrationExtended,
        maxCalibrationExtension,
        calibrationRangePercent
    ){      
        this.calibrationProcedureId = calibrationProcedureId;
        this.calibrationProcedureName = calibrationProcedureName;
        this.lastCalibrationDate = lastCalibrationDate;
        this.dueCalibrationDate = dueCalibrationDate;
        this.calibrationExtended = calibrationExtended;
        this.maxCalibrationExtension = maxCalibrationExtension;
        this.calibrationRangePercent = calibrationRangePercent;      
  }
}

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


// GET endpoint: get sensor by id
router.get('/:sensorId', (req, res, next) => {
    const id = req.params.sensorId;
    Sensor.findById(id)
        .exec()
        .then(doc => {
            //To handle non-existing id error, but correct format...
            if (doc) {
                return res.status(200).json({
                    doc,
                    request: {
                        type: 'GET',
                        url: req.originalUrl                    
                    }  
                });
            } else {
                return res.status(400).json({
                    message: 'No VALID ENTRY',
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

    // Calibration.find().where('procedureName').in(calibrationNames).exec()
    // .then(cals => {        
    //     if(cals.length > 0){
    //         for (let i = 0; i < cals.length; i++) {
    //             const calProcedure = new calibrationProcedure(
    //                 cals[i]._id, 
    //                 calibrationNames[i],
    //                 lastCalibrationDate, 
    //                 dueCalibrationDate,
    //                 calibrationExtended,
    //                 maxCalibrationExtension,
    //                 calibrationRangePercent
    //             );           
    //             cals[i].sensors.push(sensor._id);
    //             sensor.calibrations.push(calProcedure);                                
    //         }
    //         const saveCals = cals.map(cal => cal.save());
    //         Promise.all(saveCals)
    //         .then(() => {
    //             sensor.save().then(result => {
    //                 res.status(201).json({
    //                     message: `SUCCESS: Sensor was save and calibrations procedures were updated per sensor references...`,   
    //                     sensor: result,
    //                     request: {
    //                         type: 'POST',
    //                         url: req.originalUrl                    
    //                     }   
    //                 });
    //             });  
    //         })
    //         .catch(() => {
    //             res.status(500).json({
    //                 calibrations,
    //                 error: "Internal Server Error: Sensor references were not saved to calibration documents",
    //                 request: {
    //                     type: 'POST',
    //                     url: req.originalUrl                    
    //                 }
    //             });
    //         })     
    //     } else {
    //         console.log(`Calibration procedures ${calibrationNames} were not found`);
    //         res.status(400).json({
    //             calibrationNames,
    //             cals,
    //             error: `Failed to find specified calibration procedures for this sensor...`,               
    //             request: {
    //                 type: 'POST',
    //                 url: req.originalUrl                    
    //             }  
    //         });
    //     }
    // })
    // .catch(() => {
    //     res.status(500).json({
    //         error: "Internal Server Error: Sensor was not saved to database",
    //         request: {
    //             type: 'POST',
    //             url: req.originalUrl                    
    //         }
    //     });
    // })
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
