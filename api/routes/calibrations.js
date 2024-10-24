const mongoose = require("mongoose");
const express = require("express");
const Calibration = require("../models/calibration");
const Procedure = require("../models/procedure");
const Sensor = require("../models/sensor");
const router = express.Router();

//Routers
// GET endpoint: all calibration documents
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

// GET endpoint: get calibration procedure  by id
router.get("/:calibrationId", (req, res, next) => {
  const id = req.params.calibrationId;
  Calibration.findById(id)
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

//PATCH endpoint: updating PARTIALLY existing SENSOR document
router.patch("/:calibrationId", (req, res, next) => {
  const id = req.params.calibrationId;
  console.log(req.body);
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

  Promise.all([
    Sensor.findById(sensorId).exec(),
    Procedure.findById(procedureId).exec(),
  ])
    .then(([sensor, procedure]) => {
      sensor.calibrations.push(_id); //push calibration event _id into sensor's array field
      procedure.calibrations.push(_id); //push calibration event _id into sensor's array field

      Promise.all([sensor.save(), procedure.save(), calibration.save()])
        .then((result) => {
          res.status(201).json({
            message: `SUCCESS: Calibration event ${calibration.calibrationName} successufully SAVED. 
                Calibration event id {${_id}} pushed into array fields of sensor ${sensor.EID} and procedure ${procedure.procedureName}.`,
            sensor: result[0],
            procedure: result[1],
            calibration: result[2],
            request: {
              type: "POST",
              url: req.originalUrl,
            },
          });
        })
        .catch(() => {
          res.status(500).json({
            message: "Internal Server Error",
            request: {
              type: "POST",
              url: req.originalUrl,
            },
          });
        });
    })
    .catch(() => {
      res.status(500).json({
        sensorID,
        procedureId,
        message:
          "Something went wrong... Sensor and/or Procedure were not found.",
        request: {
          type: "POST",
          url: req.originalUrl,
        },
      });
    });
});

/// API endpoint: delete a single procedure by MongoDB id
router.delete("/:procedureId", (req, res, next) => {
  const id = req.params.procedureId;
  const name = `{${req.body.startRangeLevel}-${req.body.endRangeLevel}${req.body.units}}`;
  Calibration.deleteOne({ _id: id })
    .exec()
    .then((doc) => {
      if (doc.deletedCount === 1) {
        res.status(200).json({
          message: `SUCCESS! Calibration procedure ${name} was deleted from database`,
          deletedCalibrationProcedure: {
            id: req.params.procedureId,
            name: req.body.procedureName,
            description: req.body.description,
          },
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
    })
    .catch(() => {
      res.status(400).json({
        error: `Failed to delete the procedure ${name} associated with id {${id}}. (Hint: the sensor id {${id}} format is INVALID; thus, not found in the database...)`,
        request: {
          type: "DELETE",
          url: req.originalUrl,
        },
      });
    });
});

module.exports = router;
