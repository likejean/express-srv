
//New User Form Inputs object container for userFactory
const newUserFormContainer = {
	email: {
		value: "popachs@yahoo.com",
		validator: () => {},
		inputRule: ``,
		regex: "",
	},
	password: {
		value: "Accord_2000",
		validator: () => {},
		inputRule: ``,
		regex: "",
	},
	username: {
		value: "likejean",
		validator: () => {},
		inputRule: ``,
		regex: "",
	},
	firstname: {
		value: "Sergey",
		validator: () => {},
		inputRule: ``,
		regex: "",
	},
	lastname: {
		value: "Popach",
		validator: () => {},
		inputRule: ``,
		regex: "",
	},
	age: {
		value: 48,
		validator: () => {},
		inputRule: ``,
		regex: "",
	},
	aboutYourself: {
		value: "I am Intec test engineer",
		validator: () => {},
		inputRule: ``,
		regex: "",
	},
	title: {
		value: "Self-Photo",
		validator: () => {},
		inputRule: ``,
		regex: "",
	},
	description: {
		value: "My Photos",
		validator: () => {},
		inputRule: ``,
		regex: "",
	},
	avatar: {
		noFileChosen: true,
		validator: () => {},
		inputRule: ``,
		regex: "",
	}
};

var _userfactory = new userFactory(
	editUserInputContainer, 
	newUserFormContainer
);
