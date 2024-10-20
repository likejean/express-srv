const mongoose = require('mongoose');
const express = require('express');
const Procedure = require('../models/procedure');
const Calibration = require('../models/calibration');
const router = express.Router();





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


