const newChartDatasetFormContainer = {
	calibrationId: {
		value: "",
		validator: () => {},
		inputRule: ``,
		regex:""
	},
    datasetSize: { 
        value: 5,
		validator: number => number <= 20 && number > 0,
		inputRule: `dataset range should be at least 5 datapoints and no more than 20 datapoints`,
		regex:""
    },
	errorPercentLimit: { 
        value: 1,
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
    seriesLabel: {
        value: "",
		validator: () => {},
		inputRule: ``,
		regex:""
    },
    seriesDescription: {
        value: "",
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