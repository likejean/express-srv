//const form = document.getElementById("new-chart-dataset-form");
const form = document.getElementById("new-chart-dataset-form");
const submitButton = document.getElementById("get-chart-dataset-form-values");
const iconErrorLimits = document.getElementById("add-error-limits");
const iconErrorDatapoint = document.getElementById("add-error-datapoint");

const inputErrorLimits = document.getElementById("errorPercentLimit");
const inputCalibratorOutput = document.getElementById("calibratorOutput");
const inputSensorError = document.getElementById("sensorError");

const addChartErrorLimitsButton = document.getElementById("add-chart-error-limits");
const addChartDatapointButton = document.getElementById("add-chart-datapoint");

const chartFormModalHeaderText = document.querySelector(".new-chart-record-modal-header");
const currentSensorDatasetSize = document.getElementById("current-sensor-error-dataset-size");



var newChartDatasetPostData = {}; //this object for storing POST request body


//Preset New Calibration Form fields with initial values using GLOBAL DATASET FACTORY
Object.entries(_chartfactory.newDatasetFormInputs).forEach(([key, obj]) => {	
	form.elements[key].value = obj.value;
	//sets the error limit percent decimal to 2 significant figures
	if (key === "errorPercentLimit") form.elements[key].value = obj.value.toFixed(2);
	submitButton.disabled = !_chartfactory.isSubmitButtonActive();
	currentSensorDatasetSize.innerText = _chartfactory.getSensorErrorLineDatasetCurrentLength();
	if (key === "calibratorOutput" && (obj.value === null || obj.value === "") 
		|| key === "sensorError" && (obj.value === null || obj.value === "")) 
	addChartDatapointButton.disabled = true;
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


	// Allow a user to enter positive integers only
	if(name === "datasetSize") {
		e.target.value = Math.trunc(parseFloat(value));
		if (inputCalibratorOutput.disabled)  inputCalibratorOutput.disabled = false;
		inputCalibratorOutput.value = null;
		if (inputSensorError.disabled)  inputSensorError.disabled = false;	
		inputSensorError.value = null;
		addChartDatapointButton.style.backgroundColor = "grey";	
		["fa-solid", "fa-check", "fa-3x"].forEach(classItem => iconErrorDatapoint.classList.remove(classItem));
		iconErrorDatapoint.classList.add('fa-plus');
		addChartDatapointButton.disabled = false;
		currentSensorDatasetSize.innerText = _chartfactory.getSensorErrorLineDatasetCurrentLength();
		currentSensorDatasetSize.style.backgroundColor = 'rgb(5, 238, 94)';
		currentSensorDatasetSize.style.borderColor = 'rgb(5, 238, 94)';
		currentSensorDatasetSize.style.paddingTop = '0px';
		currentSensorDatasetSize.style.paddingBottom = '0px';
		
	}

	// Allow a user enter only valid positive or negative decimal numbers
	if(name === "sensorError" || name === "calibratorOutput" || name === "datasetStartAt" || name === "datasetEndAt") {	
		if (!value.match(_chartfactory.newDatasetFormInputs[name].regex) || value === null)
			e.target.value = lastValue;
		else
			lastValue = value;
	}

	_chartfactory.newDatasetFormInputs[name].value = e.target.value;	
	newChartDatasetPostData[name] = value;
	submitButton.disabled = !_chartfactory.isSubmitButtonActive();
	

	//Updates preview chart x and y labels
	if(name === "datasetUnits" || name === "chartXLabel" || name === "chartYLabel") {
		updateChartLabelUnits(
			_chartfactory.newDatasetFormInputs.chartXLabel.value, 
			_chartfactory.newDatasetFormInputs.chartYLabel.value, 
			_chartfactory.newDatasetFormInputs.datasetUnits.value);
	}


	//Updates a current datapoint entry for sensor output
	if(name === "calibratorOutput" || name === "sensorError") {
		name === "calibratorOutput" ? 
		_chartfactory.insertChartDatapoint(value, "calibratorOutput") 
		: 
		_chartfactory.insertChartDatapoint(value, "sensorError")
	}


	//Check if both calibratorOutput and sensorError are non-zero numbers: if it's true, enables add button for sensor datapoint
	if ((name === "calibratorOutput" && isNonZeroNumber(Number(value)) && isNonZeroNumber(Number(_chartfactory.newDatasetFormInputs.sensorError.value))
		|| name === "sensorError" && isNonZeroNumber(Number(value)) && isNonZeroNumber(Number(_chartfactory.newDatasetFormInputs.calibratorOutput.value))))
		addChartDatapointButton.disabled = false;	
	else addChartDatapointButton.disabled = true;


	//Upates the preview chart title
	if(name === "chartTitle") {
		updateChartTitle(_chartfactory.newDatasetFormInputs.chartTitle.value);
	}

	//Updates chart series label 
	if(name === "seriesLabel") updateCurrentDatasetLegend(_chartfactory.newDatasetFormInputs.seriesLabel.value);

	//Highlights the user input field border
	if (_chartfactory.isFormInputFieldEmpty(name)) e.target.style.border = "3px solid red";
    else e.target.style.border = "2px solid blue";
}


//Adds a new datapoint to chart
function addNewDatapointToChart() {
	updateCurrentChartLine();
	
	if(Number(_chartfactory.newDatasetFormInputs.datasetSize.value) === _chartfactory.getSensorErrorLineDatasetCurrentLength()){
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
	else currentSensorDatasetSize.innerText = _chartfactory.getSensorErrorLineDatasetCurrentLength();	
}

//generates plots for upper and lower error limits based upon error limit percentage input
function addErrorLimitLinesToChart() {
	_chartfactory.buildErrorLimitChartLines();
	addErrorLimitChartLines(_chartfactory.errorUpperLimitLineDataset, _chartfactory.errorLowerLimitLineDataset);
	addChartErrorLimitsButton.disabled = true;
	inputErrorLimits.disabled = true;
	addChartErrorLimitsButton.style.backgroundColor = "green";
	iconErrorLimits.classList.remove('fa-plus');
	["fa-solid", "fa-check", "fa-3x"].forEach(classItem => iconErrorLimits.classList.add(classItem));
	iconErrorLimits.style.color = 'white';
}

//////Function handler on button submission
submitButton.onclick = function() {

	const formData = new FormData(form);
	const keysToRemove = ["sensorError", "calibratorOutput", "datasetSize"];
	
	
	for (const [key, value] of formData.entries()) {
		
		if (key === "calibrationId") {
			newChartDatasetPostData[key] = _store.activeSensorCard.calibrations.filter(item => item.calibrationName === value)[0]._id;
			
		}
		else if (key === "datasetStartAt" || key === "datasetEndAt" || key === "errorPercentLimit") newChartDatasetPostData[key] = Number(value);
		else newChartDatasetPostData[key] = value;
	}

	chartFormModalHeaderText.innerText = "Sensor\u00a0" + _store.activeSensorCard.description + "\u00a0" + _store.activeSensorCard.EID;
	
	//adds new key-pairs to POST request object
	newChartDatasetPostData["sensorDescription"] = _store.activeSensorCard.description;
	newChartDatasetPostData["sensorId"] = _store.activeSensorCard._id;

	
	newChartDatasetPostData["sensorDatasets"] = _chartfactory.sensorErrorLineDataset;	
	newChartDatasetPostData["errorUpperLimit"] = _chartfactory.errorUpperLimitLineDataset;
	newChartDatasetPostData["errorLowerLimit"] = _chartfactory.errorLowerLimitLineDataset;

	DeleteKeys(newChartDatasetPostData, keysToRemove);
	inputs.forEach((item) => item.removeEventListener("input", inputHandler));
}


function isNonZeroNumber(input) {
	if (typeof input !== 'number') {
		return false;
	}
	return input !== 0 && !isNaN(input) && isFinite(input);
}


