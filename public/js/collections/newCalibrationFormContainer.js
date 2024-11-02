const newCalRecordFormContainer = {
	sensorId: {
		value: "",
		validator: () => {},
		inputRule: ``,
		regex:""
	},
	procedureId: {
		value: "",
		validator: () => {},
		inputRule: ``,
		regex:""
	},
	calibrationName: {
		value: "55520241212-TC",
		validator: () => {},
		inputRule: ``,
		regex:""
	},
	lastCalibrationDate: {
		value: moment().format("YYYY-MM-DD"),
		validator: () => {},
		inputRule: ``,
		regex:""
	},
	dueCalibrationDate: {
		value: moment().format("YYYY-MM-DD"),
		validator: () => {},
		inputRule: ``,
		regex:""
	},
	calibrationExtended: {
		checked: false,
		validator: () => {},
		inputRule: ``,
		regex:""
	},
	adjustmentsMade: {
		checked: true,
		validator: () => {},
		inputRule: ``,
		regex:""
	},
	comment: {
		value: "TBD...",
		validator: () => {},
		inputRule: ``,
		regex:""
	},
	maxCalibrationExtension: {
		value: "6-months",
		validator: () => {},
		inputRule: ``,
		regex:""
	},
	calibrationRangePercent: {
		value: 100,
		validator: number => number < 100 && number > 0,
		inputRule: `percentage value should be within 0%-100%`,
		regex:""
	},
};

//Instantiation of calibationFactory Class
const _calfactory = new calibrationFactory(
	"",
	"",
	"",
	editCalibrationInputContainer,
	newCalRecordFormContainer
);
