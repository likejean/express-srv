const mongoose = require('mongoose');


const calibrationSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        createdAt: { type: 
            Date, default: 
            Date.now, 
            required: false
        },
        procedureId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Procedure',
            required: true
        },
        sensorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sensor',
            required: true
        },
        calibrationName: { 
            type: String, 
            required: true 
        },
        lastCalibrationDate: { 
            type: Date, 
            default: Date.now, 
            required: true 
        },
        dueCalibrationDate: { 
            type: Date, 
            default: Date.now, 
            required: true 
        },  
        adjustmentsMade: { 
            type: Boolean, 
            required: true 
        },       
        calibrationExtended: { 
            type: Boolean, 
            required: true 
        },
        maxCalibrationExtension: { 
            type: String, 
            required: false 
        },
        calibrationRangePercent: { 
            type: Number, 
            default: 100,
            min: 0,
            max: 100,
            required: true
        },
        comment: { 
            type: String, 
            required: false 
        },
    }
);

module.exports = mongoose.model('Calibration', calibrationSchema);