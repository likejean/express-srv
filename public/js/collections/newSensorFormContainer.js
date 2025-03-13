
var commentValidFormat = /[`'"]/;

const newSensorFormContainer = {
	EID: {
		value: "EIDXXX",
		validator: () => {},
		inputRule: ``,
		regex: "",
	},
	type: {
		value: "Type",
		validator: () => {},
		inputRule: ``,
		regex: "",
	},
	calibrationPriority: {
		value: "Mandatory",
		validator: () => {},
		inputRule: ``,
		regex: "",
	},
	calibrationFrequency: {
		value: "Annually",
		validator: () => {},
		inputRule: ``,
		regex: "",
	},
	calibratedBy: {
		value: "Intec",
		validator: () => {},
		inputRule: ``,
		regex: "",
	},
	location: {
		value: "Portable",
		validator: () => {},
		inputRule: ``,
		regex: "",
	},
	description: {
		value: "Sensor Description",
		validator: () => {},
		inputRule: ``,
		regex: "",
	},
	capacityRange: {
		value: "Capacity Range",
		validator: () => {},
		inputRule: ``,
		regex: "",
	},
	comment: {
		value: "None",
		validator: str => commentValidFormat.test(str) ? false : true,
		inputRule: `Invalid characters used! Remove these special characters from your comment text:(')(")(\`)`,
		regex: "",
	},
	model: {
		value: "Model",
		validator: () => {},
		inputRule: ``,
		regex: "",
	},
	quantity: {
		value: "Quantity",
		validator: () => {},
		inputRule: ``,
		regex: "",
	},
	manufacturer: {
		value: "MTS",
		validator: () => {},
		inputRule: ``,
		regex: "",
	},
};

var _sensfactory = new sensorFactory(
	editSensorInputContainer, 
	newSensorFormContainer
);
