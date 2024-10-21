const mongoose = require('mongoose');
const express = require('express');
const Procedure = require('../models/procedure');
const Calibration = require('../models/calibration');
const router = express.Router();



//Routers
// GET endpoint: all calibration documents
router.get('/', (req, res, next) => {
    Procedure
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
            message:   `Successfully fetched ${docs.length} calibration procedure document(s)`,
            collectionName: "procedures",
            payload: docs.map(doc => {
                return {
                    _id: doc._id,
                    procedureName: doc.procedureName,
                    calibratorModel: doc.calibratorModel,
                    measurementQuantity: doc.measurementQuantity,
                    units: doc.units,                    
                    startRangeLevel: doc.startRangeLevel,
                    endRangeLevel: doc.endRangeLevel,
                    description: doc.description,                    
                    comment: doc.comment,
                    manufacturer: doc.manufacturer,
                    calibrations: doc.calibrations,
                    createdAt: doc.createdAt,
                };
            }),
            total: docs.length,
            request: {
                type: 'GET',
                url: req.originalUrl
            }
        });
    })
    .catch(() => {
        res.status(500).json({
            message: "Failure: Calibration events were not fetched... Something went wrong",
            request: {
                type: 'GET',
                url: req.originalUrl                    
            }  
        });
    });
});




//POST endpoint: creates a new calibration PROCEDURE MongoDB document

router.post('/', (req, res, next) => {
    const _id = new mongoose.Types.ObjectId();

    const {
        calibratorModel,
        measurementQuantity,
        units,
        startRangeLevel,
        endRangeLevel,
        description,
        calibrationPrinciple,        
        comment,
        manufacturer        
    } = req.body;

    const procedure = new Procedure({
        _id,        
        procedureName: `{${startRangeLevel}-${endRangeLevel}${units}}`,
        calibratorModel,
        measurementQuantity,
        units,
        startRangeLevel,
        endRangeLevel,
        description,
        calibrationPrinciple,        
        comment,
        manufacturer,     
        calibrations: []  
    });

    procedure
        .save()
        .then(result => {
        console.log({url: req.originalUrl, type: 'POST', status: "SUCCESS"});
        res.status(200).json({
            message: `SUCCESS: Created new calibration procedure: ${result.procedureName}`,
            result,
            request: {
                type: 'POST',
                url: req.originalUrl
            }          
           
        });
    })
    .catch(() => {
        res.status(500).json({
            message: "Failed to create a new calibration procedure to Database",
            request: {
                type: 'POST',
                url: req.originalUrl                    
            }  
        });
    });

});

module.exports = router;


