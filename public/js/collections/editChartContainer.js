const limitChartTitleText = /^.{10,75}$/;

const editChartInputContainer = {
	chartTitleWrapper: {
        tag: "input",
		attributes: {type: "text", name: "chartTitle", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "chartTitle",
		validator: (text) => (limitChartTitleText.test(text)) ? true : false,
        inputRule: `Minimum 10 and maximum 60 characters are allowed here...`,
    },
	datasetSeriesDescriptionWrapper: {
        tag: "input",
		attributes: {type: "text", name: "datasetSeriesDescription", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "seriesDescription",
    },
	datasetSeriesLabelWrapper: {
        tag: "input",
		attributes: {type: "text", name: "datasetSeriesLabel", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "seriesLabel",
    },
}