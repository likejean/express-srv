const newArticleFormContainer = {

	title: {
		value: "Title",
		validator: () => {},
		inputRule: `Title cannot be empty`,
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
	formula: {
		value: "",
		validator: () => {},
		inputRule: `Formula cannot be empty`,
		regex:""
	},
	imageLink: {
		value: "",
		validator: str => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(str),
		inputRule: `Invalid URL format! Please enter a valid URL for the image link.`,
		regex:""
	},
	resourceLink: {
		value: "",
		validator: str => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(str),
		inputRule: `Invalid URL format! Please enter a valid URL for the resource link.`,
		regex:""
	}
}

_articlefactory = new articleFactory(
	newArticleFormContainer
);