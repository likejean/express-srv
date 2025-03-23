const newChartDatasetFormContainer = {
	calibrationId: {
		value: "",
		validator: () => {},
		inputRule: ``,
		regex:""
	},
	errorPercentLimit: { 
        value: 1.0,
		validator: () => {},
		inputRule: ``,
		regex:""
    },
    datasetSize: { 
        value: 16,
		validator: number => number <= 20 && number > 0,
		inputRule: `dataset range should be at least 5 datapoints and no more than 20 datapoints`,
		regex:""
    },
	datasetStartAt: { 
        value: -0.2,
		validator: () => {},
		inputRule: ``,
		regex:""
    },
	datasetEndAt: { 
        value: 0.2,
		validator: () => {},
		inputRule: ``,
		regex:""
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
	"",
	newChartDatasetFormContainer
);