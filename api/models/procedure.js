const mongoose = require('mongoose');
const { calibrationPrinciples } = require('../../enums/modelEnums');

const procedureSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        createdAt: { type: 
            Date, default: 
            Date.now, 
            required: false},
        procedureName: {
            type: String, 
            unique: true, 
            required: true
        },
        calibratorModel: {
            type: String, 
            required: true
        },
        measurementQuantity: {
            type: String, 
            required: true
        },
        units: {type: 
            String, 
            required: true
        },
        startRangeLevel: {type: 
            Number, 
            required: true
        },
        endRangeLevel: {
            type: Number, 
            required: true
        },
        description: {
            type: String, 
            required: true
        },
        calibrationPrinciple: {
            type: String,
            required: true,
            enum: calibrationPrinciples
        },
        comment: {type: String, default: 'None'},
        calibrations: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Calibration',
                required: true,
            },
        ],
        manufacturer: { type: String, required: false }
    }
);

module.exports = mongoose.model('Procedure', procedureSchema);