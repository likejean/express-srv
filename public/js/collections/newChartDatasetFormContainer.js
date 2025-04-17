const newChartDatasetFormContainer = {
	calibrationName: {
		value: "",
		validator: () => {},
		inputRule: ``,
		regex:""
	},
	errorLimit: { 
        value: 1.0,
		validator: () => {},
		inputRule: ``,
		regex:""
    },
	errorType: { 
        value: "",
		validator: () => {},
		inputRule: ``,
		regex:""
    },
    datasetSize: { 
        value: 6,
		validator: number => number <= 20 && number > 0,
		inputRule: `dataset range should be at least 5 datapoints and no more than 20 datapoints`,
		regex:""
    },
	datasetStartAt: { 
        value: -2.0,
		validator: () => {},
		inputRule: ``,
		regex: ""
    },
	datasetEndAt: { 
        value: 2.0,
		validator: () => {},
		inputRule: ``,
		regex: ""
    },
	calibratorOutput: { 
        value: null,
		validator: () => {},
		inputRule: `Invalid Input`,
		regex: /^-?\d*\.?\d{0,6}$/
    },
	sensorError: { 
        value: null,
		validator: () => {},
		inputRule: `Invalid`,
		regex: /^-?\d*\.?\d{0,6}$/
    },
	datasetUnits: { 
        value: "",
		validator: () => {},
		inputRule: ``,
		regex:""
    },
    chartTitle: {
        value: "Sensor Hysteresis and Linearity",
		validator: () => {},
		inputRule: ``,
		regex:""
    },
    chartYLabel: {
        value: "Absolute Error",
		validator: () => {},
		inputRule: ``,
		regex:""
    },
    chartXLabel: {
        value: "Calibrator Output",
		validator: () => {},
		inputRule: ``,
		regex:""
    },
    seriesLabel: {
        value: "Current",
		validator: () => {},
		inputRule: ``,
		regex:""
    },
    seriesDescription: {
        value: "Ascending Order Run",
		validator: () => {},
		inputRule: ``,
		regex:""
    }
};

//Instantiation of datasetFactory Class
const _chartfactory = new datasetFactory(
	editChartInputContainer,
	newChartDatasetFormContainer
);

