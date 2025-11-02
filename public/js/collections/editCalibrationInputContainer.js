const allowedChars = /^[-., a-zA-Z0-9]*$/;
const limitCommentText = /^.{10,300}$/;
const validateDateFormat = /^\d{4}-\d{2}-\d{2}$/; 
const noSpecial = /^[^*|\"<>[\]{}`\\';@&$]+$/;


const editCalibrationInputContainer = {
        
    //Calibration Record Card: Edit Input Wrappers
    calNameWrapper: {
        tag: "input",
		attributes: {type: "text", name: "calName", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",		
        childNodes: [],
        databaseName: "calibrationName",
        validator: (text) => (allowedChars.test(text) ? true : false),
        inputRule: `Error! No special characters allowed here (exception: dashes "-")`,
    },
    lastCalDateWrapper: {
        tag: "input",
		attributes: {type: "date", name: "lastCalDate", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "lastCalibrationDate",        
        validator: (dateString) => {
			if (validateDateFormat.test(dateString)) {
				const date = new Date(dateString);
				return (date instanceof Date && !isNaN(date));
			} 
			return false;
        },
        inputRule: `Date must be valid format: 2020-01-01`,
    },
    dueCalDateWrapper: {
        tag: "input",
		attributes: {type: "date", name: "dueCalDate", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "dueCalibrationDate",        
        validator: (dateString) => {
			if (validateDateFormat.test(dateString)) {
				const date = new Date(dateString);
				return (date instanceof Date && !isNaN(date));
			} 
			return false;
        },
        inputRule: `Date must be valid format: 2020-01-01`,
    },
    calExtendedWrapper: {
        tag: "input",
		attributes: {type: "checkbox", name: "calExtended", style:"border-color:blue;"},
        classes: ["form-check-input"],
        status: false,
        value: "",
        checked: false,
        childNodes: [],
        databaseName: "calibrationExtended",
    },
    maxCalExtentionWrapper: {
        tag: "input",
		attributes: {type: "text", name: "maxCalExtention", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "maxCalibrationExtension",
    },

    calRangePercentWrapper: {
        tag: "input",
		attributes: {type: "number", name: "calRangePercent", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "calibrationRangePercent",
        validator: (number) => (number <= 100 && number >= 10 ? true : false),
        inputRule: `Error! Only positive integers allowed within range: 10%-100%`,
    },

    calAdjustmentMadeWrapper: {
        tag: "input",
		attributes: {type: "checkbox", name: "calAdjustmentMade", style:"border-color:blue;"},
        classes: ["form-check-input"],
        status: false,
        value: "",
        checked: false,
        childNodes: [],
        databaseName: "adjustmentsMade",
    },
	
    calCommentWrapper: {
        tag: "textarea",
		attributes: {type: "text", name: "calComment", rows: "10", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "comment",        
        validator: (text) => (limitCommentText.test(text)) ? (noSpecial.test(text)) ? true : false : false,
        inputRule: `No special characters allowed and minimum 10 and maximum 300 characters are allowed here...`,
    },
};



