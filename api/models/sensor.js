const mongoose = require('mongoose');

const calibrationPriorities = [
    'Mandatory',
    'Optional',
    'Unserviceable',
    'Broken'
];

const calibrationFrequencies = [
    'Weekly',
    'Biweekly',
    'Monthly',
    'Quarterly',
    'Semiannually',
    'Annually',
    'Discretionary'
];


const sensorSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        createdAt: { type: Date, default: Date.now, required: false},       
        calibrations: [{
            calibrationProcedureId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Calibration',
                required: true,
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
                default: 0,
                min: 10,
                max: 100,
                required: true
            }
        }],
        EID: {
            type: String,
            required: true,
            unique: true,
            match: /^EID[0-9]+$/,
        },
        type: { 
            type: String, 
            required: true 
        },    
        calibrationPriority: {
            type: String,
            required: true,
            enum: calibrationPriorities
        },
        calibrationFrequency: {
            type: String,
            required: true,
            enum: calibrationFrequencies
        },
        calibratedBy: { 
            type: String, 
            required: false, 
            default: 'Intec' 
        },         
        description: {
            type: String, 
            required: true
        },
        location: {
            type: String, 
            default: 'Testing Lab'
        },
        comment: {
            type: String, 
            default: 'None'
        },
        capacityRange: { 
            type: String, 
            required: true 
        },
        units: { 
            type: String, 
            required: true 
        },
        manufacturer: { 
            type: String, 
            required: false 
        }
    }
);

module.exports = mongoose.model('Sensor', sensorSchema);