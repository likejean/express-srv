const mongoose = require('mongoose');


const calibrationPrinciples = [
    'Dimensional',
    'Temperature',
    'Pressure',
    'Humidity',
    'Alignment',
    'Electrical',
    'Radio',
    'Flow'
];

const Schema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,

        procedureName: {type: String, unique: true, required: true},
        calibratorName: {type: String, required: true},
        measurementQuantity: {type: String, required: true},
        units: {type: String, required: true},
        startRangeLevel: {type: Number, required: true},
        endRangeLevel: {type: Number, required: true},
        calibrationPrinciple: {
            type: String,
            required: true,
            enum: calibrationPrinciples
        },

        comment: {type: String, default: 'None'},
        devices: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Sensor',
                required: false,
            },
        ],
    },
    {timestamps: {createdAt: true, updatedAt: false}},
);

export default mongoose.model('Calibration', Schema);