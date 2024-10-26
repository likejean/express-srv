const mongoose = require("mongoose");
const express = require("express");
const Calibration = require("../models/calibration");
const Procedure = require("../models/procedure");
const Sensor = require("../models/sensor");
const router = express.Router();

//Routers
// GET endpoint: get ALL calibration documents/records
router.get("/", (req, res, next) => {
  Calibration.find()
    .exec()
    .then((docs) => {
      console.log({
        total: docs.length,
        request: {
          type: "GET",
          url: req.originalUrl,
          status: "SUCCESS",
        },
      });
      res.status(200).json({
        message: `Successfully fetched ${docs.length} calibration event(s)`,
        collectionName: "calibrations",
        payload: docs.map((doc) => {
          return {
            _id: doc._id,
            calibrationName: doc.calibrationName,
            procedureId: doc.procedureId,
            sensorId: doc.sensorId,
            lastCalibrationDate: doc.lastCalibrationDate,
            dueCalibrationDate: doc.dueCalibrationDate,
            adjustmentsMade: doc.adjustmentsMade,
            calibrationExtended: doc.calibrationExtended,
            maxCalibrationExtension: doc.maxCalibrationExtension,
            calibrationRangePercent: doc.calibrationRangePercent,
            comment: doc.comment,
            createdAt: doc.createdAt,
          };
        }),
        total: docs.length,
        request: {
          type: "GET",
          url: req.originalUrl,
        },
      });
    })
    .catch(() => {
      res.status(500).json({
        message:
          "Failure: Calibration events were not fetched... Something went wrong",
        request: {
          type: "GET",
          url: req.originalUrl,
        },
      });
    });
});

// GET endpoint: get a calibration record by ID
router.get("/:calibrationId", (req, res, next) => {
  const id = req.params.calibrationId;
  Calibration.findById(id)
    .populate("sensorId")
    .populate("procedureId")
    .exec()
    .then((doc) => {
      //To handle non-existing id error, but correct format...
      if (doc) {
        console.log({
          request: {
            type: "GET",
            url: req.originalUrl,
            status: "SUCCESS",
          },
        });
        return res.status(200).json({
          calibration: doc,
          request: {
            type: "GET",
            url: req.originalUrl,
          },
        });
      } else {
        console.log({
          request: {
            message: "Invalid Entry",
            type: "GET",
            url: req.originalUrl,
            status: "FAILURE",
          },
        });
        return res.status(400).json({
          message: "Invalid Entry",
          request: {
            type: "GET",
            url: req.originalUrl,
          },
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failure: Unable to fetch calibration procedure data...",
        error: err,
        request: {
          type: "GET",
          url: req.originalUrl,
        },
      });
    });
});

//PATCH endpoint: update PARTIALLY existing calibration record/document by ID
router.patch("/:calibrationId", (req, res, next) => {
  const id = req.params.calibrationId;
  console.log("Request body:", req.body);
  Calibration.updateOne({ _id: id }, { $set: { ...req.body } })
    .exec()
    .then((result) => {
      console.log({
        request: {
          type: "PATCH",
          url: req.originalUrl,
          status: "SUCCESS",
        },
      });
      res.status(200).json({
        message: `Calibration record w/ id: '${id}' was Updated.`,
        request: {
          type: "PATCH",
        },
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failure: Unable to update calibration...",
        error: err,
        request: {
          type: "PATCH",
          url: req.originalUrl,
        },
      });
    });
});

//POST endpoint: creates a new calibration EVENT MongoDB document
/////////////TBD

router.post("/", (req, res, next) => {
  const _id = new mongoose.Types.ObjectId();
  const {
    procedureId,
    sensorId,
    calibrationName,
    lastCalibrationDate,
    dueCalibrationDate,
    adjustmentsMade,
    calibrationExtended,
    maxCalibrationExtension,
    calibrationRangePercent,
    comment,
  } = req.body;

  const calibration = new Calibration({
    _id,
    procedureId,
    sensorId,
    calibrationName,
    lastCalibrationDate,
    dueCalibrationDate,
    adjustmentsMade,
    calibrationExtended,
    maxCalibrationExtension,
    calibrationRangePercent,
    comment,
  });

  calibration
    .save() //save calibration record document
    .then((result) => {
      Promise.all([
        Sensor.findById(sensorId).exec(), //find sensor document by specified reference id
        Procedure.findById(procedureId).exec(), //find procedure by specified reference id
      ])
        .then(([sensor, procedure]) => {
          sensor.calibrations.push(_id); //push calibration event _id into sensor's array field
          procedure.calibrations.push(_id); //push calibration event _id into sensor's array field
          Promise.all([sensor.save(), procedure.save()])
            .then(() => {
              //SUCCESS:
              console.log({
                request: {
                  type: "POST",
                  url: req.originalUrl,
                  status: "SUCCESS",
                },
              });
              res.status(200).json({
                message: `SUCCESS: Calibration event ${calibration.calibrationName} successufully SAVED. 
                            Calibration event id was pushed into reference arrays of sensor ${sensor.EID} and procedure ${procedure.procedureName}.`,
                result,
                request: {
                  type: "POST",
                  url: req.originalUrl,
                },
              });
            })
            //FAILURE: if specified references were not saved in
            .catch(() => {
              res.status(500).json({
                message:
                  "Failed to save reference id in sensor and procedure...",
                request: {
                  type: "POST",
                  url: req.originalUrl,
                },
              });
            });
        })
        //FAILURE: if either sensor or procedure (or both) associated with current calibraton record were not found
        .catch(() => {
          res.status(500).json({
            message:
              "Failed to find either sensor and/or procedure documents by ids...",
            request: {
              type: "POST",
              url: req.originalUrl,
            },
          });
        });
    })
    //FAILURE: if calibration record was not saved
    .catch(() => {
      res.status(500).json({
        message:
          "Failed to save a calibration procedure (possibly, failed to meet Schema model requirements)",
        request: {
          type: "POST",
          url: req.originalUrl,
        },
      });
    });
});

///DELETE API endpoint: delete a calibration record/document by ID
router.delete("/:procedureId", (req, res, next) => {
  const id = req.params.procedureId;
  const { procedureId, sensorId } = req.body;
  console.log("req.body", procedureId, sensorId);
  res.status(200).json({ success: "SUCCESS" });
  Calibration.deleteOne({ _id: id })
    .exec()
    .then((doc) => {
      if (doc.deletedCount === 1) {

        
        console.log({
          request: {
            type: "DELETE",
            url: req.originalUrl,
            status: "SUCCESS",
          },
        });
        res.status(200).json({
          message: `SUCCESS! Calibration procedure ${name} was deleted from database`,
          deletedDocument: doc,
          request: {
            type: "DELETE",
            url: req.originalUrl,
          },
        });
      } else {
        res.status(400).json({
          error: `Error: (Hint: the procedure ${name} id {${id}} is valid, but seems like not found in the database (possibly, deteted already in the past).`,
          request: {
            type: "DELETE",
            url: req.originalUrl,
          },
        });
      }
    });
});
//   .catch(() => {
//     res.status(400).json({
//       error: `Failed to delete the procedure ${name} associated with id {${id}}. (Hint: the sensor id {${id}} format is INVALID; thus, not found in the database...)`,
//       request: {
//         type: "DELETE",
//         url: req.originalUrl,
//       },
//     });
//   });

module.exports = router;
