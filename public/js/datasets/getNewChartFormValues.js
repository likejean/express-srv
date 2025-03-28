//const form = document.getElementById("new-chart-dataset-form");
const form = document.getElementById("new-chart-dataset-form");
const submitButton = document.getElementById("get-chart-dataset-form-values");
const addChartErrorLimitsButton = document.getElementById("add-chart-error-limits");


var newChartDatasetPostData = {}; //this object for storing POST request body


//Preset New Calibration Form fields with initial values using GLOBAL DATASET FACTORY
Object.entries(_chartfactory.newDatasetFormInputs).forEach(([key, obj]) => {	
	form.elements[key].value = obj.value;
	//sets the error limit percent decimal to 2 significant figures
	if (key === "errorPercentLimit") form.elements[key].value = obj.value.toFixed(2);
	submitButton.disabled = !_chartfactory.isSubmitButtonActive();
});

//Attach eventListener callbacks to all New Chart Dataset Form Inputs to guide input entry events
var inputs = document.querySelectorAll("input, select");
for (i = 0; i < inputs.length; i++) {
	inputs[i].oninput = inputHandler;
}


//
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
	if(name === "datasetSize") e.target.value = Math.trunc(parseFloat(value));

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

	if(name === "seriesLabel") updateCurrentDatasetLegend(_chartfactory.newDatasetFormInputs.seriesLabel.value)


	//Upates the preview chart title
	if(name === "chartTitle") {
		updateChartTitle(_chartfactory.newDatasetFormInputs.chartTitle.value);
	}

	

	//Highlights the user input field border
	if (_chartfactory.isFormInputFieldEmpty(name)) e.target.style.border = "3px solid red";
    else e.target.style.border = "2px solid blue";

	
}


function addNewDatapointToChart() {
	updateCurrentChartLine();	
}

function addErrorLimitLinesToChart() {
	_chartfactory.buildErrorLimitChartLines();
	addErrorLimitChartLines(_chartfactory.errorUpperLimitLineDataset, _chartfactory.errorLowerLimitLineDataset);	
	_chartfactory.errorUpperLimitLineDataset = [];
	addChartErrorLimitsButton.disabled = true;
}

//////Function handler on button submission
submitButton.onclick = function() {

	const formData = new FormData(form);

	for (const [key, value] of formData.entries()) {
		if (key === "calibrationId") newChartDatasetPostData[key] = _store.activeSensorCard.calibrations.filter(item => item.calibrationName === value)[0]._id;
		
		else newChartDatasetPostData[key] = value;
	}

	//adds new key-pairs to POST request object
	newChartDatasetPostData["sensorDescription"] = _store.activeSensorCard.description;
	newChartDatasetPostData["sensorId"] = _store.activeSensorCard._id;
	newChartDatasetPostData["sensorDatasets"] = _chartfactory.sensorErrorLineDataset;
	
	newChartDatasetPostData["errorUpperLimit"] = _chartfactory.errorUpperLimitLineDataset;

	newChartDatasetPostData["errorLowerLimit"] = _chartfactory.errorLowerLimitLineDataset;

	console.log(_chartfactory);

	console.log(newChartDatasetPostData);

	inputs.forEach((item) => item.removeEventListener("input", inputHandler));
}
 

