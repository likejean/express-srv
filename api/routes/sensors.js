const mongoose = require('mongoose');
const express = require('express');
const Sensor = require('../models/sensor');
const Calibration = require('../models/calibration');
const router = express.Router();



//Routers
// GET endpoint
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
                message: "Failure",
                error: err
            });
        });
});


//POST endpoint

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
                    .then(() => console.log(`Sensor ${sensor.EID} added to ${doc.name} procedure`))
                    .catch(() => {
                        res.status(500).json({
                            error: "Sensor was not saved to procedure"
                        });
                    });
                })
                .catch((err)=>{
                    console.log(err);
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


module.exports = router;
