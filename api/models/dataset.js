const mongoose = require('mongoose');
const { calibrationUnits } = require('../../enums/modelEnums');


const datasetSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        createdAt: { type: Date, default: Date.now, required: false}, 
		sensorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Sensor',
			required: true
		}, 
		sensorDescription: {
			type: String,
			required: false,
			default: 'Extensometer'
		},
		units: { 
			type: String, 
			required: true,
			enum: calibrationUnits
		},
		chartTitle: {
			type: String,
			required: false,
			default: "Sensor Hysteresis"
		},
		chartYLabel: {
			type: String,
			required: false,
			default: 'Absolute Error'
		},
		chartXLabel: {
			type: String,
			required: false,
			default: 'Calibrator Output'
		},
		calibratorDataset: {
			type: [Number],
			required: true
		},
		sensorDatasets: [{
			seriesDescription: {
				type: String, 
				required: false
			},
			calibrationId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Calibration',
				required: true
			},
			seriesLabel: {
				type: String,
				required: true,
				default: 'None'
			},
			dataset: [Number]
		}],	
		errorPercentLimit: {
			type: Number,
			required: false,
			default: 1
		},
		errorUpperLimit: {
			type: [Number],
			required: true
		},
		errorLowerLimit: {
			type: [Number],
			required: true
		}
    }
);

module.exports = mongoose.model('Dataset', datasetSchema);