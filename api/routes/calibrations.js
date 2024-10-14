const mongoose = require('mongoose');
const express = require('express');
const Calibration = require('../models/calibration');
const router = express.Router();


//Routers
// GET endpoint
router.get('/', (req, res, next) => {
    Calibration
        .find()
        .exec()
        .then(docs => {
            res.status(200).json({
                message:   `Successfully fetched ${docs.length} calibration document(s)`,
                payload: docs.map(doc => {
                    return {
                        _id: doc._id,
                        procedureName: doc.procedureName,
                        calibratorModel: doc.calibratorModel,
                        measurementQuantity: doc.measurementQuantity,
                        units: doc.units,
                        comment: doc.comment,
                        startRangeLevel: doc.startRangeLevel,
                        endRangeLevel: doc.endRangeLevel,
                        manufacturer: doc.manufacturer,
                        calibrationPrinciple: doc.calibrationPrinciple,
                        sensors: doc.sensors ? doc.sensors : [],
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
                message: "Failure",
                error: err,
                request: {
                    type: 'GET',
                    url: req.originalUrl                    
                }  
            });
        });
});

// GET endpoint: get calibration procedure  by id
router.get('/:procedureId', (req, res, next) => {
    const id = req.params.procedureId;
    Calibration.findById(id)
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
                message: "Failure: Unable to fetch calibration procedure data...",
                error: err,
                request: {
                    type: 'GET',
                    url: req.originalUrl                    
                }  
            });
        });
});


//PATCH endpoint: updating PARTIALLY existing SENSOR document
router.patch('/:procedureId', (req, res, next) => {
    const id = req.params.procedureId;
    const {        
        calibratorModel,
        measurementQuantity,
        units,
        comment,
        startRangeLevel,
        endRangeLevel,
        description,
        calibrationPrinciple,
        manufacturer
    } = req.body;

    Calibration.updateOne({_id: id}, {
        $set: {
            calibratorModel,
            measurementQuantity,
            units,
            comment,
            startRangeLevel,
            endRangeLevel,
            description,
            calibrationPrinciple,
            manufacturer
        }
    })
    .exec()
    .then(result => {
        console.log('patch_result', result);
        res.status(200).json({
            message: `Calibration procedure w/ id: '${id}' was Updated.`,
            request: {
                type: 'PATCH'
            },
            result
        });
    })
    .catch(err => {
        res.status(500).json({
            message: "Failure: Unable to update calibration procedure...",
            error: err,
            request: {
                type: 'PATCH',
                url: req.originalUrl                    
            }  
        });
    });
});


//POST endpoint
router.post('/', (req, res, next) => {

    const _id = new mongoose.Types.ObjectId();
    const {
        calibratorModel,
        measurementQuantity,
        units,
        comment,
        startRangeLevel,
        endRangeLevel,
        description,
        calibrationPrinciple,
        manufacturer,
        sensors
    } = req.body;

    const newCalibrationProcedure = new Calibration({
        _id,
        calibratorModel,
        procedureName: `{${startRangeLevel}-${endRangeLevel}${units}}`,
        description,
        measurementQuantity,
        units,
        comment,
        startRangeLevel,
        endRangeLevel,
        calibrationPrinciple,
        manufacturer,
        sensors
    });

    newCalibrationProcedure
        .save()
        .then(result => {
        res.status(200).json({
            message: `SUCCESS: Created new calibration process: {${result.startRangeLevel} to ${result.endRangeLevel} ${result.units}}`,
            addedCalibrationProcedure: {
                id: result._id,                
                measurementQuantity: result.measurementQuantity,
                units: result.units,
                manufacturer: result.manufacturer
            },
            request: {
                type: 'POST',
                url: req.originalUrl
            }          
           
        });
    })
    .catch(err => {
        res.status(500).json({
            err,
            message: "Failed to add Calibration Procedure to Database",
            request: {
                type: 'POST',
                url: req.originalUrl                    
            }  
        });
    });
});



/// API endpoint: delete a single procedure by MongoDB id
router.delete('/:procedureId', (req, res, next) => {
    const id = req.params.procedureId;
    const name = `{${req.body.startRangeLevel}-${req.body.endRangeLevel}${req.body.units}}`;
    Calibration.deleteOne({_id: id})
        .exec()
        .then(doc => {
            if(doc.deletedCount === 1){                                       
                res.status(200).json({
                    message: `SUCCESS! Calibration procedure ${name} was deleted from database`,
                    deletedCalibrationProcedure: {
                        id: req.params.procedureId,
                        name: req.body.procedureName,
                        description: req.body.description
                    },                    
                    request: {
                        type: 'DELETE',
                        url: req.originalUrl                    
                    }    
                });                           

            }else{
                res.status(400).json({
                    error: `Error: (Hint: the procedure ${name} id {${id}} is valid, but seems like not found in the database (possibly, deteted already in the past).`,
                    request: {
                        type: 'DELETE',
                        url: req.originalUrl                    
                    }    
                })
            }

        }).catch(()=>{                
            res.status(400).json({
                error: `Failed to delete the procedure ${name} associated with id {${id}}. (Hint: the sensor id {${id}} format is INVALID; thus, not found in the database...)`,  
                request: {
                    type: 'DELETE',
                    url: req.originalUrl                    
                }                      
            });
        });
    });




module.exports = router;