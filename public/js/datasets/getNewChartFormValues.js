//const form = document.getElementById("new-chart-dataset-form");
const form = document.getElementById("new-chart-dataset-form");
const submitButton = document.getElementById("get-chart-dataset-form-values");


var newChartDatasetPostData = {}; //this object for storing POST request body


//Preset New Calibration Form fields with initial values using GLOBAL DATASET FACTORY
Object.entries(_chartfactory.newDatasetFormInputs).forEach(([key, obj]) => {	
	form.elements[key].value = obj.value;
	submitButton.disabled = !_chartfactory.isSubmitButtonActive();
});

//Attach eventListener callbacks to all New Chart Dataset Form Inputs to guide input entry events
var inputs = document.querySelectorAll("input, select");
for (i = 0; i < inputs.length; i++) {
	inputs[i].oninput = inputHandler;
}

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

	let name = e.target.name;
	let value = name === "datasetSize" ? Number(e.target.value) : e.target.value;

	if(name === "datasetSize") e.target.value = Math.trunc(parseFloat(value));

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

	//Upates preview chart title
	if(name === "chartTitle") {
		updateChartTitle(_chartfactory.newDatasetFormInputs.chartTitle.value);
	}
	
}


submitButton.onclick = function() {
	const formData = new FormData(form);


	for (const [key, value] of formData.entries()) {
		newChartDatasetPostData[key] = value;
		console.log(key, value)
	}

	inputs.forEach((item) => item.removeEventListener("input", inputHandler));
}


