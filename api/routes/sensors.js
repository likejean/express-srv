const mongoose = require('mongoose');
const express = require('express');
const Sensor = require('../models/sensor');
const router = express.Router();





router.post('/', (req, res, next) => {
    const sensor = new Sensor({
        _id: new mongoose.Types.ObjectId(),
        EID: req.body.EID,
        type: req.body.type,    
        priority: req.body.priority,
        calibrationDate: req.body.calDate,
        expirationDate: req.body.expDate,
        calibrationExtended: req.body.calExtended,
        maxCalibrationExtension: req.body.maxCalExtension,
        location: req.body.location,
        description: req.body.description,
        calibrationRange: req.body.calRange,
        comment: req.body.comment,
        units: req.body.units,
        manufacturer: req.body.manufacturer
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
                message: "Failed to add Sensor",
                error: err
            });
        });
});


module.exports = router;
