const editSensorInputContainer = {

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