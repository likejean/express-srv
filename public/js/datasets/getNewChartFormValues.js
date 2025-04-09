//const form = document.getElementById("new-chart-dataset-form");
const form = document.getElementById("new-chart-dataset-form");
const submitButton = document.getElementById("get-chart-dataset-form-values");
const iconErrorLimits = document.getElementById("add-error-limits");
const iconErrorDatapoint = document.getElementById("add-error-datapoint");

const inputErrorLimits = document.getElementById("errorLimit");
const inputCalibratorOutput = document.getElementById("calibratorOutput");
const inputSensorError = document.getElementById("sensorError");

const addChartErrorLimitsButton = document.getElementById("add-chart-error-limits");
const addChartDatapointButton = document.getElementById("add-chart-datapoint");

const currentSensorDatasetSize = document.getElementById("current-sensor-error-dataset-size");

const addSensorDataPlotButton = document.getElementById("add-current-line-plot");
const doneSensorDataEntriesButton = document.getElementById("disable-sensor-data-entries");



var newChartDatasetPostData = {}; //this object for storing POST request body


//Preset New Calibration Form fields with initial values using GLOBAL DATASET FACTORY
Object.entries(_chartfactory.newDatasetFormInputs).forEach(([key, obj]) => {	
	form.elements[key].value = obj.value;
	//sets the error limit percent decimal to 2 significant figures
	if (key === "errorLimit") form.elements[key].value = obj.value.toFixed(2);
	if (key === "datasetStartAt") form.elements[key].value = obj.value.toFixed(2);
	if (key === "datasetEndAt") form.elements[key].value = obj.value.toFixed(2);
	submitButton.disabled = !_chartfactory.isSubmitButtonActive();
	currentSensorDatasetSize.innerText = _chartfactory.getSensorErrorLineDatasetCurrentLength();

});

//Attach eventListener callbacks to all New Chart Dataset Form Inputs to guide input entry events
var inputs = document.querySelectorAll("input, select");
for (i = 0; i < inputs.length; i++) {
	inputs[i].oninput = inputHandler;
}


//Prevent datasetSize input entries from negative values
inputs.forEach((element) => {
	if (element.name === "datasetSize"){
		element.addEventListener('keydown', function(event) {
			if (event.key === '-') {
				event.preventDefault();
			}
		}); 
	}
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////
//callback handler function for "ONINPUT" EventListener

function inputHandler(e) {
	var lastValue = ""; 

	let name = e.target.name;
	let value = name === "datasetSize" ? Number(e.target.value) : e.target.value;
	
	
	_chartfactory.newDatasetFormInputs[name].value = e.target.value;	
	newChartDatasetPostData[name] = value;
	submitButton.disabled = !_chartfactory.isSubmitButtonActive();

	
	if(_chartfactory.currentDatasetSeries.length === 0) addSensorDataPlotButton.disabled = true;


	//Updates preview chart x and y labels
	if(name === "datasetUnits" || name === "chartXLabel" || name === "chartYLabel") {
		updateChartLabelUnits(
			_chartfactory.newDatasetFormInputs.chartXLabel.value, 
			_chartfactory.newDatasetFormInputs.chartYLabel.value, 
			_chartfactory.newDatasetFormInputs.datasetUnits.value);
	}


	// Allow a user enter only valid positive or negative decimal numbers
	if(name === "sensorError" || name === "calibratorOutput") {	
		if (!value.match(_chartfactory.newDatasetFormInputs[name].regex) || value === null)
			e.target.value = lastValue;
		else
			lastValue = value;
	}

	//Updates a current datapoint entry for sensor output
	if(name === "calibratorOutput" || name === "sensorError") {
		name === "calibratorOutput" ? 
		_chartfactory.insertChartDatapoint(value, "calibratorOutput") 
		: 
		_chartfactory.insertChartDatapoint(value, "sensorError")
	}

	//Upates the preview chart title
	if(name === "chartTitle") {
		updateChartTitle(_chartfactory.newDatasetFormInputs.chartTitle.value);
	}

	//Updates chart series label 
	if(name === "seriesLabel") updateCurrentDatasetLegend(
		_chartfactory.newDatasetFormInputs.seriesLabel.value,
		_chartfactory.currentDatasetSeries
	);


	//Highlights the user input field border
	if (_chartfactory.isFormInputFieldEmpty(name)) e.target.style.border = "3px solid red";
    else e.target.style.border = "2px solid blue";
}


//Adds a new datapoint to chart
function addNewDatapointToChart() {
	updateCurrentChartLine(_chartfactory.currentDatasetSeries);
	
	if(Number(_chartfactory.newDatasetFormInputs.datasetSize.value) === _chartfactory.getSensorErrorLineDatasetCurrentLength()){
		addSensorDataPlotButton.disabled = false;
		currentSensorDatasetSize.innerText = 'FULL';
		currentSensorDatasetSize.style.backgroundColor = 'red';
		currentSensorDatasetSize.style.borderColor = 'red';
		currentSensorDatasetSize.style.paddingTop = '12px';
		currentSensorDatasetSize.style.paddingBottom = '12px';
		inputCalibratorOutput.disabled = true;
		inputSensorError.disabled = true;
		addChartDatapointButton.style.backgroundColor = "green";
		iconErrorDatapoint.classList.remove('fa-plus');
		addChartDatapointButton.disabled = true;
		["fa-solid", "fa-check", "fa-3x"].forEach(classItem => iconErrorDatapoint.classList.add(classItem));
		iconErrorDatapoint.style.color = 'white';
	}
	else {
		addSensorDataPlotButton.disabled = true;
		currentSensorDatasetSize.innerText = _chartfactory.getSensorErrorLineDatasetCurrentLength();	
	}
}

//generates plots for upper and lower error limits based upon error limit percentage input
function addErrorLimitLinesToChart() {
	const errorType = 
	_chartfactory.buildErrorLimitChartLines();
	//_chartfactory.currentDatasetSeries = _chartfactory.currentDatasetSeries + 2;  //tracks the number of datasets inserted into a chart
	addErrorLimitChartLines(_chartfactory.errorUpperLimitLineDataset, _chartfactory.errorLowerLimitLineDataset);
	addChartErrorLimitsButton.disabled = true;
	inputErrorLimits.disabled = true;
	addChartErrorLimitsButton.style.backgroundColor = "green";
	iconErrorLimits.classList.remove('fa-plus');
	["fa-solid", "fa-check", "fa-3x"].forEach(classItem => iconErrorLimits.classList.add(classItem));
	iconErrorLimits.style.color = 'white';
}

//////Function handler on button submission
function submitChartDatasets() {

	const formData = new FormData(form);

	//user input keys that must be cleaned out
	const keysToRemove = ["sensorError", "calibratorOutput", "errorType", "datasetSize", "seriesDescription", "seriesLabel", "calibrationName"];
	
	
	for (const [key, value] of formData.entries()) {		
		if (key === "datasetStartAt" || key === "datasetEndAt" || key === "errorLimit") newChartDatasetPostData[key] = Number(value);
		else newChartDatasetPostData[key] = value;
	}
	
	//adds new key-pairs to POST request object
	newChartDatasetPostData["sensorId"] = _store.activeSensorCard._id;
	newChartDatasetPostData["sensorDescription"] =`${_store.activeSensorCard.description} ${ _store.activeSensorCard.EID}`;
	
	//stores array of sensor error output dataset(s). An array element contains the following object:
	// {
	// 		plotId: [String],
	// 		seriesLabel: [String],
	// 		seriesDescription: [String],
	// 		calibrationId: [String],
	// 		dataset: [Array]
	// }
	newChartDatasetPostData["sensorDatasets"] = _chartfactory.sensorDatasets;	

	//stores arrays of error upper and lower limits
	newChartDatasetPostData["errorUpperLimit"] = _chartfactory.errorUpperLimitLineDataset;
	newChartDatasetPostData["errorLowerLimit"] = _chartfactory.errorLowerLimitLineDataset;

	DeleteKeys(newChartDatasetPostData, keysToRemove);
	createNewChartDatasetRecord();
	inputs.forEach((item) => item.removeEventListener("input", inputHandler));
}


function isNonZeroNumber(input) {
	if (typeof input !== 'number') {
		return false;
	}
	return input !== 0 && !isNaN(input) && isFinite(input);
}


