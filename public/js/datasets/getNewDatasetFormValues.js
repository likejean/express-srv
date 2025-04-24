//this file is responsible for getting the new dataset form values and updating the chart with the new dataset values
const form = document.getElementById("new-dataset-form");

//HTML labels and icons for current dataset size and add/remove datapoint buttons
const currentSensorDatasetSize = document.getElementById("current-sensor-error-dataset-size");
const iconErrorDatapoint = document.getElementById("add-error-datapoint");

//HTML inputs for calibrator output and sensor error
const inputCalibratorOutput = document.getElementById("calibratorOutput");
const inputSensorError = document.getElementById("sensorError");


//HTML buttons for adding/removing chart datapoints
const addChartDatapointButton = document.getElementById("add-chart-datapoint");
const removeChartDatapointButton = document.getElementById("remove-chart-datapoint");
const submitNewDatasetButton = document.getElementById("submit-new-dataset-form-values");

//post request body for creating a new dataset
//NOTE: this object is used to store the values from the form inputs and is sent to the server when the form is submitted
var newDatasetPostData = {}; 

//Form Initializion
Object.entries(_chartfactory.newDatasetFormInputs).forEach(([key, obj]) => {
	
	//check if the form element exists before assigning the value
	if(form.elements[key]) form.elements[key].value = obj.value;
	
	//check if the form inputs are empty or null, is so, deactivate the buttons and zero out the current dataset size
	submitNewDatasetButton.disabled = !_chartfactory.isSubmitButtonActive();	
	currentSensorDatasetSize.innerText = _chartfactory.getSensorErrorLineDatasetCurrentLength();
	
	
	//disable buttons if the value is null or empty string
	if (key === "calibratorOutput" && (obj.value === null || obj.value === "") 
		|| key === "sensorError" && (obj.value === null || obj.value === "")) 
	addChartDatapointButton.disabled = true;
	removeChartDatapointButton.disabled = true;

	//diable the input fields if the calibration name is not selected
	if (_chartfactory.newDatasetFormInputs.calibrationName.value === "") {
		if (!inputCalibratorOutput.disabled) inputCalibratorOutput.disabled = true;
		inputCalibratorOutput.value = null;
		if (!inputSensorError.disabled) inputSensorError.disabled = true;	
		inputSensorError.value = null;
	}

});

//attach event listeners to the form inputs to update the newDatasetPostData object
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



//inputHandler function is called when the user inputs a value into the form inputs
//this function updates the newDatasetPostData object with the new values and updates the chart with the new values
function inputHandler(e) {
	
	let name = e.target.name;
	let value = name === "datasetSize" ? Number(e.target.value) : e.target.value;

	//update the newDatasetPostData object with the new values
	_chartfactory.newDatasetFormInputs[name].value = e.target.value;	
	newDatasetPostData[name] = value;

	//DISABLE sensorError and calibratorOutput user input fields if either datasetUnits or calibrationName (or both) not selected by a user
	if (_chartfactory.newDatasetFormInputs.calibrationName.value){
		if (inputCalibratorOutput.disabled) inputCalibratorOutput.disabled = false;
		if (inputSensorError.disabled) inputSensorError.disabled = false;	
	}else{
		if (!inputCalibratorOutput.disabled) inputCalibratorOutput.disabled = true;
		inputCalibratorOutput.value = null;
		if (!inputSensorError.disabled) inputSensorError.disabled = true;	
		inputSensorError.value = null;
	}

	//disable the submit button if the dataset size is not a number or less than 1	
	if(_chartfactory.currentDatasetSeries.length === 0) submitNewDatasetButton.disabled = true;


	//update the current dataset size and enable the input fields for calibrator output and sensor error
	//if the dataset size is not a number or less than 1, disable the submit button and set the current dataset size to 0
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
		addChartDatapointButton.disabled = true;
		
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


	//Highlights the user input field border
	if (_chartfactory.isFormInputFieldEmpty(name)) e.target.style.border = "3px solid red";
    else e.target.style.border = "2px solid blue";

}


//add a new datapoint to the chart
//this function is called when the user clicks the add button for sensor error datapoint
function addNewDatapointToChart() {
	
	//updates a chart global factory
	_chartfactory.buildSensorErrorOutputChartLine({
		x: Number(_chartfactory.currentChartDatapointEntry.x),
		y: Number(_chartfactory.currentChartDatapointEntry.y)
	});
	//updates inner text of the current dataset size label
	currentSensorDatasetSize.innerText = _chartfactory.getSensorErrorLineDatasetCurrentLength();
		
	//if the dataset size is equal to the current dataset size, disable the add button and enable the submit button
	if(Number(_chartfactory.newDatasetFormInputs.datasetSize.value) === _chartfactory.getSensorErrorLineDatasetCurrentLength()){
		submitNewDatasetButton.disabled = false;
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
	//if the dataset size is not equal to the current dataset size, update the current dataset size label and enable the remove button
	else {
		submitNewDatasetButton.disabled = true;
		currentSensorDatasetSize.innerText = _chartfactory.getSensorErrorLineDatasetCurrentLength();
		if(_chartfactory.getSensorErrorLineDatasetCurrentLength() > 0) {
			removeChartDatapointButton.disabled = false;
		}	
	}
}



//this function removes the last datapoint from the chart and updates the chart with the new values
function removeDatapointFromChart() {
	
	//updates a chart global factory
	_chartfactory.currentSensorErrorLineDataset.pop();
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


