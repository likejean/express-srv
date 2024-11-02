const editSensorInputContainer = {


	sensorDescriptionWrapper: {
        tag: "text",
		attributes: {type: "text", name: "sensorDescription", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "comment"
    },


	calibrationPriorityWrapper: {
        tag: "select",
		attributes: {type: "text", name: "calibrationPriority", style:"border-color:blue;"},
        classes: ["form-select"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "comment"
    },

	sensorCommentWrapper: {
        tag: "textarea",
		attributes: {type: "text", name: "sensorComment", rows: "10", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "comment",        
        validator: (text) => (limitCommentText.test(text) ? true : false),
        inputRule: `Minimum 10 and maximum 300 characters are allowed here...`,
    },
}