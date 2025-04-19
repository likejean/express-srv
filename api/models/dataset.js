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
			required: true,
			default: 'Extensometer'
		},
		datasetUnits: { 
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
		sensorDatasets: [{
			plotId: {
				type: String,
				required: true
			},
			calibrationId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Calibration',
				required: true
			},
			calibrationName: {
				type: String,
				required: true
			},
			seriesDescription: {
				type: String, 
				required: false
			},			
			seriesLabel: {
				type: String,
				required: true,
				default: 'None'
			},
			dataset: [{
				x: {
					type: Number,
					required: false,
					default: 0
				},
				y: {
					type: Number,
					required: false,
					default: 0
				}
			}]
		}],	
		errorLimit: {
			type: Number,
			required: true,
			default: 1
		},
		errorUpperLimit: {
			type: [{
				x: {
					type: Number,
					required: false,
					default: 0
				},
				y: {
					type: Number,
					required: false,
					default: 0
				}
			}],
			required: true
		},
		errorLowerLimit: {
			type: [{
				x: {
					type: Number,
					required: false,
					default: 0
				},
				y: {
					type: Number,
					required: false,
					default: 0
				}
			}],
			required: true
		}
    }
);

module.exports = mongoose.model('Dataset', datasetSchema);