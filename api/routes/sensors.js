const mongoose = require('mongoose');
const express = require('express');
const Sensor = require('../models/sensor');
const router = express.Router();



//Routers
router.get('/', (req, res, next) => {
    Sensor
        .find()
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                sensors: docs.map(doc => {                    
                    return {
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
                        calibrationRange: doc.calRange,
                        comment: doc.comment,
                        units: doc.units,
                        manufacturer: doc.manufacturer,
                        createdAt: doc.createdAt,
                        request: {
                            type: 'GET'
                        }
                    };                    
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                comment: 'something is wrong...',
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    const sensor = new Sensor({
        _id: new mongoose.Types.ObjectId(),
        EID: req.body.EID,
        type: req.body.type,    
        priority: req.body.priority,
        calibrationDate: req.body.calDate,
        expirationDate: req.body.expDate,
        calibrationExtended: req.body.calExtended,
        calibratedBy: req.body.calibratedBy,
        maxCalibrationExtension: req.body.maxCalExtension,
        location: req.body.location,
        description: req.body.description,
        calibrationRange: req.body.calRange,
        comment: req.body.comment,
        units: req.body.units,
        manufacturer: req.body.manufacturer,
        createdAt:req.body.createdAt
    });
   
    sensor.save()
        .then(result => {
            res.status(201).json({
                message: `${result.description} sensor with EID${result.EID} was added...`,
                
                addedSensor: {
                    id: result._id,
                    EID: result.EID,
                    description: result.description,
                    calibrationDate: result.calDate,
                    expirationDate: result.expDate,
                },
                request: {
                    type: 'GET'
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "Failed to add Sensor to Database",
                error: err
            });
        });
});


module.exports = router;
