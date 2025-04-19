const limitChartSeriesDescriptionText = /^.{10,300}$/;
const limitChartTitleText = /^.{10,75}$/;
const limitChartAxisLabelText = /^.{10,40}$/;
const limitChartSeriesLabelText = /^.{5,25}$/;
const noSpecial = /^[^*|\"<>[\]{}`\\';@&$]+$/;

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
        tag: "textarea",
		attributes: {type: "text", name: "seriesDescription", rows: "10", style:"border-color:blue;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "seriesDescription",        
        validator: (text) => (limitChartSeriesDescriptionText.test(text)) ? (noSpecial.test(text)) ? true : false : false,
        inputRule: `No special characters allowed and minimum 10 and maximum 300 characters are allowed here...`,
		
    },
	seriesLabelWrapper: {
        tag: "input",
		attributes: {type: "text", name: "seriesLabel", style:"border-color:darkgreen;"},
        classes: ["form-control"],
        status: false,
        value: "",
        childNodes: [],
        databaseName: "seriesLabel",
		validator: (text) => (limitChartSeriesLabelText.test(text)) ? true : false,
        inputRule: `Minimum 5 and maximum 25 characters are allowed here...`,
    },
}