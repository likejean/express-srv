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
                error: err
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
        });
    });
});


module.exports = router;