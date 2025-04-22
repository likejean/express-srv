//const form = document.getElementById("new-chart-dataset-form");
const form = document.getElementById("new-dataset-form");

const currentSensorDatasetSize = document.getElementById("current-sensor-error-dataset-size");

//button HTML elements
const submitNewDatasetButton = document.getElementById("submit-new-dataset-form-values");
const addChartDatapointButton = document.getElementById("add-chart-datapoint");
const removeChartDatapointButton = document.getElementById("remove-chart-datapoint");


var newDatasetPostData = {}; //this object for storing POST request body

//initialize the form inputs with the values from the _chartfactory object
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

console.log(inputs);

function inputHandler(e) {
	//update the newDatasetPostData object with the current value of the input field
	newDatasetPostData[e.target.name] = e.target.value;
	
	
}

