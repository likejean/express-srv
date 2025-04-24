//const form = document.getElementById("new-chart-form");
const form = document.getElementById("new-chart-form");

//icon HTML elements
const iconErrorLimits = document.getElementById("add-error-limits");
const iconErrorDatapoint = document.getElementById("add-error-datapoint");

//input HTML elements
const inputErrorLimits = document.getElementById("errorLimit");
const inputCalibratorOutput = document.getElementById("calibratorOutput");
const inputSensorError = document.getElementById("sensorError");
const currentSensorDatasetSize = document.getElementById("current-sensor-error-dataset-size");
const currentPlotSeriesCount = document.getElementById("current-plot-quantity-count");

//button HTML elements
const prepareDatasetButton = document.getElementById("prepare-new-chart-form-values");
const submitChartDatasets = document.getElementById("submit-new-chart-datasets")
const addChartErrorLimitsButton = document.getElementById("add-chart-error-limits");
const addChartDatapointButton = document.getElementById("add-chart-datapoint");
const removeChartDatapointButton = document.getElementById("remove-chart-datapoint");
const addSensorDataPlotButton = document.getElementById("add-current-line-plot");
const doneSensorDataEntriesButton = document.getElementById("disable-sensor-data-entries");



var newChartPostData = {}; //this object for storing POST request body


//Preset NEW CHART Form fields with initial values using GLOBAL DATASET FACTORY
Object.entries(_chartfactory.newDatasetFormInputs).forEach(([key, obj]) => {	
	
	//if form elements exist, set their values to the corresponding values from the dataset factory
	if(form.elements[key]) form.elements[key].value = obj.value;
	else throw new Error(`Form element with name ${key} not found`);
	
	//sets the numerical decimals to 2 significant figures (fixed)
	if (key === "errorLimit") form.elements[key].value = obj.value.toFixed(2);
	if (key === "datasetStartAt") form.elements[key].value = obj.value.toFixed(2);
	if (key === "datasetEndAt") form.elements[key].value = obj.value.toFixed(2);
	prepareDatasetButton.disabled = !_chartfactory.isSubmitButtonActive();
	submitChartDatasets.disabled = true;
	currentSensorDatasetSize.innerText = _chartfactory.getSensorErrorLineDatasetCurrentLength();
	currentPlotSeriesCount.innerText = _chartfactory.currentDatasetSeries;
	
	
	//disable buttons if calibrationOutput or sensorError input fields are empty
	if (key === "calibratorOutput" && (obj.value === null || obj.value === "") 
		|| key === "sensorError" && (obj.value === null || obj.value === "")) 
	addChartDatapointButton.disabled = true;
	addChartErrorLimitsButton.disabled = true;
	doneSensorDataEntriesButton.disabled = true;

	//disable buttons if the value is null or empty string
	if (_chartfactory.newDatasetFormInputs.datasetUnits.value === "" || _chartfactory.newDatasetFormInputs.calibrationName.value === "") {
		if (!inputCalibratorOutput.disabled) inputCalibratorOutput.disabled = true;
		inputCalibratorOutput.value = null;
		if (!inputSensorError.disabled) inputSensorError.disabled = true;	
		inputSensorError.value = null;
	}

	//disable buttons if current dataset size is zero
	if(_chartfactory.currentSensorErrorLineDataset.length === 0) {
		addSensorDataPlotButton.disabled = true;
		removeChartDatapointButton.disabled = true;
	} 

});

//Attach eventListener callbacks to all New Chart Dataset Form Inputs to guide input entry events
var inputs = document.querySelectorAll("input, select");
for (i = 0; i < inputs.length; i++) {
	inputs[i].oninput = inputHandler;
}


//prevent negative numbers from being entered into the datasetSize input field
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
	newChartPostData[name] = value;
	
	//DISABLE sensorError and calibratorOutput user input fields if either datasetUnits or calibrationName (or both) not selected by a user
	if (_chartfactory.newDatasetFormInputs.errorType.value
		&& _chartfactory.newDatasetFormInputs.datasetUnits.value 
		&& _chartfactory.newDatasetFormInputs.calibrationName.value){
		if (inputCalibratorOutput.disabled) inputCalibratorOutput.disabled = false;
		if (inputSensorError.disabled) inputSensorError.disabled = false;	
	}else{
		if (!inputCalibratorOutput.disabled) inputCalibratorOutput.disabled = true;
		inputCalibratorOutput.value = null;
		if (!inputSensorError.disabled) inputSensorError.disabled = true;	
		inputSensorError.value = null;
	}

	if(_chartfactory.currentDatasetSeries.length === 0) addSensorDataPlotButton.disabled = true;

	
	// In case if a user wants to change the dataset size while entering chart datapoints...
	if(name === "datasetSize") {
		e.target.value = Math.trunc(parseFloat(value));
		if (inputCalibratorOutput.disabled)  inputCalibratorOutput.disabled = false;
		inputCalibratorOutput.value = null;
		if (inputSensorError.disabled)  inputSensorError.disabled = false;	
		inputSensorError.value = null;
		addChartDatapointButton.style.backgroundColor = "grey";	
		["fa-solid", "fa-check"].forEach(classItem => iconErrorDatapoint.classList.remove(classItem));
		iconErrorDatapoint.classList.add('fa-plus');
		addChartDatapointButton.disabled = false;
		currentSensorDatasetSize.innerText = _chartfactory.getSensorErrorLineDatasetCurrentLength();
		currentSensorDatasetSize.style.backgroundColor = 'rgb(5, 238, 94)';
		currentSensorDatasetSize.style.borderColor = 'rgb(5, 238, 94)';
		currentSensorDatasetSize.style.paddingTop = '0px';
		currentSensorDatasetSize.style.paddingBottom = '0px';
		addSensorDataPlotButton.disabled = true;
		
	}

		

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
	
	//Check if both calibratorOutput and sensorError are non-zero numbers: if it's true, enables add button for sensor datapoint
	if ((name === "calibratorOutput" && isNonZeroNumber(Number(value)) && isNonZeroNumber(Number(_chartfactory.newDatasetFormInputs.sensorError.value))
		|| name === "sensorError" && isNonZeroNumber(Number(value)) && isNonZeroNumber(Number(_chartfactory.newDatasetFormInputs.calibratorOutput.value))))
		addChartDatapointButton.disabled = false;	
	else if (name === "calibratorOutput" || name === "sensorError") addChartDatapointButton.disabled = true;
		


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



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Adds a new datapoint to chart
function addNewDatapointToChart() {
	updateCurrentChartLine(_chartfactory.currentDatasetSeries);
	
	if(Number(_chartfactory.newDatasetFormInputs.datasetSize.value) === _chartfactory.getSensorErrorLineDatasetCurrentLength()){
		addSensorDataPlotButton.disabled = false;
		currentSensorDatasetSize.innerText = 'MAX';
		currentSensorDatasetSize.style.backgroundColor = 'red';
		currentSensorDatasetSize.style.borderColor = 'red';
		currentSensorDatasetSize.style.paddingTop = '2px';
		currentSensorDatasetSize.style.paddingBottom = '2px';
		inputCalibratorOutput.disabled = true;
		inputSensorError.disabled = true;
		addChartDatapointButton.style.backgroundColor = "green";
		iconErrorDatapoint.classList.remove('fa-plus');
		addChartDatapointButton.disabled = true;
		["fa-solid", "fa-check"].forEach(classItem => iconErrorDatapoint.classList.add(classItem));
		iconErrorDatapoint.style.color = 'white';
	}
	else {
		addSensorDataPlotButton.disabled = true;
		currentSensorDatasetSize.innerText = _chartfactory.getSensorErrorLineDatasetCurrentLength();
		if(_chartfactory.getSensorErrorLineDatasetCurrentLength() > 0) {
			removeChartDatapointButton.disabled = false;
		}	
	}
}


//Remove a datapoint from chart
function removeDatapointFromChart() {
	reduceCurrentChartLine(_chartfactory.currentDatasetSeries);
	currentSensorDatasetSize.innerText = _chartfactory.getSensorErrorLineDatasetCurrentLength();

	if(Number(_chartfactory.newDatasetFormInputs.datasetSize.value) === _chartfactory.getSensorErrorLineDatasetCurrentLength() + 1){
		addChartDatapointButton.style.backgroundColor = "grey";	
		["fa-solid", "fa-check"].forEach(classItem => iconErrorDatapoint.classList.remove(classItem));
		iconErrorDatapoint.classList.add('fa-plus');		
		addChartDatapointButton.disabled = false;
		currentSensorDatasetSize.style.backgroundColor = 'rgb(5, 238, 94)';
		currentSensorDatasetSize.style.borderColor = 'rgb(5, 238, 94)';
		currentSensorDatasetSize.style.paddingTop = '0px';
		currentSensorDatasetSize.style.paddingBottom = '0px';
	}
	if(_chartfactory.getSensorErrorLineDatasetCurrentLength() === 0) {
		removeChartDatapointButton.disabled = true;
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
	["fa-solid", "fa-check"].forEach(classItem => iconErrorLimits.classList.add(classItem));
	iconErrorLimits.style.color = 'white';
}


//////Function handler on button submission
function prepareChartDatasets() {

	const formData = new FormData(form);

	//user input keys that must be cleaned out
	const keysToRemove = ["sensorError", "calibratorOutput", "errorType", "datasetSize", "seriesDescription", "seriesLabel", "calibrationName"];
	
	
	for (const [key, value] of formData.entries()) {	
		if (key === "datasetStartAt" || key === "datasetEndAt" 
		|| key === "errorLimit" || key === "datasetSize") newChartPostData[key] = Number(value);
		
		else newChartPostData[key] = value;
	}
	
	//adds new key-pairs to POST request object
	newChartPostData["sensorId"] = _store.activeSensorCard._id;
	newChartPostData["sensorDescription"] =`${_store.activeSensorCard.description} ${ _store.activeSensorCard.EID}`;
	
	//stores array of sensor error output dataset(s). An array element contains the following object:
	// {
	// 		plotId: [String],
	// 		seriesLabel: [String],
	// 		seriesDescription: [String],
	// 		calibrationId: [String],
	// 		dataset: [Array]
	// }
	newChartPostData["sensorDatasets"] = _chartfactory.sensorDatasets;	

	//stores arrays of error upper and lower limits
	newChartPostData["errorUpperLimit"] = _chartfactory.errorUpperLimitLineDataset;
	newChartPostData["errorLowerLimit"] = _chartfactory.errorLowerLimitLineDataset;

	// Remove redundant keys form POST body object
	DeleteKeys(newChartPostData, keysToRemove);

	// enable Submit Chart Dataset Button
	submitChartDatasets.disabled = false; 
	
	//deattach all event listeners from input HTML elements
	inputs.forEach((item) => item.removeEventListener("input", inputHandler));
}


