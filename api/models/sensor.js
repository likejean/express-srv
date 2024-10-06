const mongoose = require('mongoose');

const sensorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    EID: { type: Number, required: true },
    type: { type: String, required: true },    
    priority: { type: String, required: true },
    calibrationDate: { type: Date, default: Date.now, required: true },
    expirationDate: { type: Date, default: Date.now, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
    calibrationExtended: { type: Boolean, required: true },
    maxCalibrationExtension: { type: String, required: false },
    location: { type: String, required: false },
    description: { type: String, required: false },
    calibrationRange: { type: String, required: true },
    comment: { type: String, required: false },
    units: { type: String, required: true },
    manufacturer: { type: String, required: false },
});

module.exports = mongoose.model('Sensor', sensorSchema);