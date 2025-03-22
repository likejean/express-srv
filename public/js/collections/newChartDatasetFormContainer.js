const newChartDatasetFormContainer = {
	calibrationId: {
		value: "",
		validator: () => {},
		inputRule: ``,
		regex:""
	}, 
    sensorDescription: {
        value: "",
		validator: () => {},
		inputRule: ``,
		regex:""
    },
    units: { 
        value: "",
		validator: () => {},
		inputRule: ``,
		regex:""
    },
    chartTitle: {
        value: "",
		validator: () => {},
		inputRule: ``,
		regex:""
    },
    chartYLabel: {
        value: "",
		validator: () => {},
		inputRule: ``,
		regex:""
    },
    chartXLabel: {
        value: "",
		validator: () => {},
		inputRule: ``,
		regex:""
    },
};

//Instantiation of datasetFactory Class
const _chartfactory = new datasetFactory(
	"",
	newChartDatasetFormContainer
);