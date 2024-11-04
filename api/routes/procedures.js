const mongoose = require('mongoose');
const express = require('express');
const Procedure = require('../models/procedure');
const Calibration = require('../models/calibration');
const router = express.Router();



//Routers

/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
// GET endpoint: get ALL calibration procedures
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
router.get('/', (req, res, next) => {
    Procedure
        .find()
		.populate("calibrations")
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
            message:   `Successfully fetched ${docs.length} calibration procedures`,
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
        console.log({
            request: {
                type: "POST",
                url: req.originalUrl,
                status: "SUCCESS",
            },
        });
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


/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////
///DELETE API endpoint: deletes procedure document by ID
/////////////COMPLETED and TESTED////////////////////////////////
/////////////COMPLETED and TESTED////////////////////////////////

router.delete('/:procedureId', (req, res, next) => {
    const id = req.params.procedureId;
    Procedure.deleteOne({_id: id})
        .exec()
        .then(doc => {
            //SUCCESS:
            console.log({
                request: {
                type: "DELETE",
                url: req.originalUrl,
                status: "SUCCESS",
                },
            });
            if(doc.deletedCount === 1){
                res.status(200).json({
					message: `SUCCESS! Calibration procedure ${req.body.procedureName} was deleted from calibration procedure`,
					deletedProcedure: {
						id: req.params.procedureId,
						EID: req.body.procedureName,
						description: req.body.description
					}, 
					deletedCount: doc.deletedCount,                   
					request: {
						type: 'DELETE',
						url: req.originalUrl                    
					}    
				});        
            }else{
                res.status(400).json({
                    error: `Error: (Hint: calibration procedure id ${req.body.procedureId} was valid, but seems like not found in the database.`,
                    request: {
                        type: 'DELETE',
                        url: req.originalUrl                    
                    }    
                })
            }

        }).catch(()=>{ 
            res.status(400).json({
				err,
				message: `Failed to delete calibration procedure ${req.body.procedureName}. (Hint: the procedure id format is INVALID; thus, not found in the database...)`, 
				isIdValid: mongoose.Types.ObjectId.isValid(id),
				request: {
				type: "DELETE",
				url: req.originalUrl,
				},
			});
        });
    })



module.exports = router;


