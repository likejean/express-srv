const limitProcedureCommentText = /^.{10,300}$/;
const limitCalibratorDescriptionText = /^.{10,250}$/;
const limitCalibratorModelText = /^.{10,40}$/;
const limitCalibratorManufacturerText = /^.{5,25}$/;
const limitProcedureNameText = /^.{5,15}$/;
const noSpecial = /^[^*|\"<>[\]{}`\\';@&$]+$/;

const editProcedureInputContainer = {

    //Chart Options: Title, X-axis Label, Y-axis Lable
	calibratorDescriptionWrapper: {
        tag: "input",
		attributes: {type: "text", name: "calibratorDescription", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "description",
		validator: (text) => (limitCalibratorDescriptionText.test(text)) ? true : false,
        inputRule: `Minimum 10 and maximum 250 characters are allowed here...`,
    },
    calibratorModelWrapper: {
        tag: "input",
		attributes: {type: "text", name: "calibratorModel", style:"border-color:darkblue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "calibratorModel",
		validator: (text) => (limitCalibratorModelText.test(text)) ? true : false,
        inputRule: `Minimum 10 and maximum 40 characters are allowed here...`,
    },
	calibratorManufacturerWrapper: {
        tag: "input",
		attributes: {type: "text", name: "calibratorManufacturer", style:"border-color:darkblue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "manufacturer",
		validator: (text) => (limitCalibratorManufacturerText.test(text)) ? true : false,
        inputRule: `Minimum 5 and maximum 25 characters are allowed here...`,
    },
    procedureNameWrapper: {
        tag: "input",
		attributes: {type: "text", name: "procedureName", style:"border-color:darkblue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "procedureName",
		validator: (text) => (limitProcedureNameText.test(text)) ? true : false,
        inputRule: `Minimum 5 and maximum 15 characters are allowed here...`,
    },

    //Datasets
	procedureCommentWrapper: {
        tag: "textarea",
		attributes: {type: "text", name: "procedureComment", rows: "10", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "comment",        
        validator: (text) => (limitProcedureCommentText.test(text)) ? (noSpecial.test(text)) ? true : false : false,
        inputRule: `No special characters allowed and minimum 10 and maximum 300 characters are allowed here...`,
		
    },
	
}