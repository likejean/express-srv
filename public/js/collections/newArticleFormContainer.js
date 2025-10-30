const limitChartTitleText = /^.{10,75}$/;

//New Article Form Inputs object container for articleFactory
const newArticleFormContainer = {

	title: {
		value: "Title",
		validator: (text) => (limitChartTitleText.test(text)) ? true : false,
        inputRule: `Title must be between 10 and 75 characters long`,
		regex:""
	},
	procedureAssociated: {
		checked: true,
		validator: () => {},
		inputRule: ``,
		regex:""
	},
	calibrationProcedures: {
		value: [],
		validator: () => {},
		inputRule: ``,
		regex:""
	},
	paragraphQuantity: {
		value: 1,
		validator: str => /^\d+$/.test(str) && Number(str) >= 0,
		inputRule: `Paragraph quantity must be a non-negative integer`,
		regex:""
	},
	content: {
		value: `§1\n\n`,
		validator: () => {},
		inputRule: `Content cannot be empty`,
		regex:""
	},
	scienceBranch: {
		value: "",
		validator: () => {},
		inputRule: `Branch cannot be empty`,
		regex:""
	},
	preface: {
		value: "",
		validator: () => {},
		inputRule: `Preface cannot be empty`,
		regex:""
	},
	imageLink: {
		value: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM0rkxVzj-IYBGzsflQSLVpQGbU0JBJPdqDA&s",
		validator: str => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(str),
		inputRule: `Invalid URL format! Please enter a valid URL for the image link.`,
		regex:""
	},
	resourceLink: {
		value: "https://www.yahoo.com/",
		validator: str => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(str),
		inputRule: `Invalid URL format! Please enter a valid URL for the resource link.`,
		regex:""
	}
}

_articlefactory = new articleFactory(
	editCalibratorInputContainer,
	newArticleFormContainer
);