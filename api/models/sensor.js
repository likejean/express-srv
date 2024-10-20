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
        calibrations: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Calibration',
                required: true,
            },
        ],
        EID: {
            type: String,
            required: true,
            unique: true,
            match: /^EID[0-9]+$/
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
            default: 'Testing Lab',
            required: false
        },
        comment: {
            type: String, 
            default: 'None',
            required: false
        },
        capacityRange: { 
            type: String, 
            required: true 
        },
        model: { 
            type: String, 
            required: true 
        },
        quantity: { 
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