const limitCommentText = /^.{10,300}$/;
const noSpecial = /^[^*|\"<>[\]{}`\\';@&$]+$/;

const editSensorInputContainer = {

	sensorDescriptionWrapper: {
        tag: "input",
		attributes: {type: "text", name: "sensorDescription", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "description"
    },

	sensorCapacityWrapper: {
        tag: "input",
		attributes: {type: "text", name: "sensorCapacity", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "capacityRange"
    },


	calibrationPriorityWrapper: {
        tag: "select",
		attributes: {type: "text", name: "calibrationPriority", style:"border-color:blue;"},
        classes: ["form-select"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "calibrationPriority"
    },

	sensorLocationWrapper: {
        tag: "input",
		attributes: {type: "text", name: "sensorLocation", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "location"
    },

	sensorCommentWrapper: {
        tag: "textarea",
		attributes: {type: "text", name: "sensorComment", rows: "10", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "comment",        
        validator: (text) => (limitCommentText.test(text)) ? (noSpecial.test(text)) ? true : false : false,
        inputRule: `No special characters allowed and minimum 10 and maximum 300 characters are allowed here...`,
    },
}