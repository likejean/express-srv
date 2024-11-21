const limitCommentText = /^.{10,300}$/;

const editUserInputContainer = {

	userEmailWrapper: {
        tag: "input",
		attributes: {type: "text", name: "userEmail", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "email"
    },

	userNickNameWrapper: {
        tag: "input",
		attributes: {type: "text", name: "userNickName", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "username"
    },


	userFirstNameWrapper: {
        tag: "input",
		attributes: {type: "text", name: "userFirstName", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "firstname"
    },

    userLastNameWrapper: {
        tag: "input",
		attributes: {type: "text", name: "userLastName", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "lastname"
    },

    userAgeWrapper: {
        tag: "input",
		attributes: {type: "number", name: "userAge", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "age"
    },

	userAboutYourselfWrapper: {
        tag: "textarea",
		attributes: {type: "text", name: "userAboutYourself", rows: "10", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "aboutYourself",        
        validator: (text) => (limitCommentText.test(text) ? true : false),
        inputRule: `Minimum 10 and maximum 300 characters are allowed here...`,
    },
}