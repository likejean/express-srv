const limitChartTitleText = /^.{10,75}$/;
const limitChartAxisLabelText = /^.{10,40}$/;

const editChartInputContainer = {
    //Chart Options: Title, X-axis Label, Y-axis Lable
	chartTitleWrapper: {
        tag: "input",
		attributes: {type: "text", name: "chartTitle", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "chartTitle",
		validator: (text) => (limitChartTitleText.test(text)) ? true : false,
        inputRule: `Minimum 10 and maximum 75 characters are allowed here...`,
    },
    chartXLabelWrapper: {
        tag: "input",
		attributes: {type: "text", name: "chartXLabel", style:"border-color:darkblue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "chartXLabel",
		validator: (text) => (limitChartAxisLabelText.test(text)) ? true : false,
        inputRule: `Minimum 10 and maximum 40 characters are allowed here...`,
    },
    chartYLabelWrapper: {
        tag: "input",
		attributes: {type: "text", name: "chartYLabel", style:"border-color:darkblue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "chartYLabel",
		validator: (text) => (limitChartAxisLabelText.test(text)) ? true : false,
        inputRule: `Minimum 10 and maximum 40 characters are allowed here...`,
    },

    //Datasets
	seriesDescriptionWrapper: {
        tag: "input",
		attributes: {type: "text", name: "seriesDescription", style:"border-color:darkgreen;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "seriesDescription",
    },
	seriesLabelWrapper: {
        tag: "input",
		attributes: {type: "text", name: "seriesLabel", style:"border-color:darkgreen;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "seriesLabel",
    },
}