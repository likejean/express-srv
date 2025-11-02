const limitArticleTitleText = /^.{10,50}$/;
const limitArticleContentText = /^.{10,5000}$/;
const limitArticlePrefaceText = /^.{10,1000}$/;
const limitArticleImageLinkText = /^.{50,450}$/;
const limitArticleResourceLinkText = /^.{50,450}$/;
const validateUrlFormat = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/[a-zA-Z0-9]+\.[^\s]{2,}|[a-zA-Z0-9]+\.[^\s]{2,})$/;

const editArticleInputContainer = {
	
	articleTitleWrapper: {
		tag: "input",
		attributes: {type: "text", name: "articleTitle", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "title",
		validator: (text) => (limitArticleTitleText.test(text)) ? true : false,
        inputRule: `Minimum 10 and maximum 50 characters are allowed here...`,
	},

	articleContentWrapper: {
		tag: "textarea",
		attributes: {type: "text", name: "articleContent", rows: "30", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "content",        
        validator: (text) => (limitArticleContentText.test(text)) ? (noSpecial.test(text)) ? true : false : false,
        inputRule: `No special characters allowed and minimum 10 and maximum 5000 characters are allowed here...`,
	},

	articlePrefaceWrapper: {
		tag: "input",
		attributes: {type: "text", name: "articlePreface", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "preface",
		validator: (text) => (limitArticlePrefaceText.test(text)) ? true : false,
        inputRule: `Minimum 10 and maximum 1000 characters are allowed here...`,
	},

	imageLinkWrapper: {
		tag: "input",
		attributes: {type: "text", name: "imageLink", style:"border-color:darkblue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "imageLink",
		validator: (text) => (validateUrlFormat.test(text)) ? true : false,
        inputRule: `Invalid URL format! Please enter a valid URL for the resource link.`,
	},

	resourceLinkWrapper: {
		tag: "input",
		attributes: {type: "text", name: "resourceLink", style:"border-color:darkblue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "resourceLink",
		validator: (text) => (validateUrlFormat.test(text)) ? true : false,
        inputRule: `Invalid URL format! Please enter a valid URL for the resource link.`,
	}

}