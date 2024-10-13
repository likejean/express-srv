const mongoose = require('mongoose');

const calibrationPrinciples = [
    'Dimensional',
    'Temperature',
    'Pressure',
    'Force',
    'Humidity',
    'Alignment',
    'Electrical',
    'Radio',
    'Flow'
];

const calibrationSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,

        procedureName: {type: String, unique: true, required: true},
        calibratorModel: {type: String, required: true},
        measurementQuantity: {type: String, required: true},
        units: {type: String, required: true},
        startRangeLevel: {type: Number, required: true},
        endRangeLevel: {type: Number, required: true},
        description: {type: String, required: true},
        calibrationPrinciple: {
            type: String,
            required: true,
            enum: calibrationPrinciples
        },

        comment: {type: String, default: 'None'},
        sensors: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Sensor',
                required: true,
            },
        ],
        manufacturer: { type: String, required: false }
    }
);

module.exports = mongoose.model('Calibration', calibrationSchema);