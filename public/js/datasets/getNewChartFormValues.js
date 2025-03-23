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


////////////////////////////////////////////////////////////////////////////////////////////////////////////
//callback handler function for "ONINPUT" EventListener
function inputHandler(e) {

	let name = e.target.name;
	let value = name === "datasetSize" ? Number(e.target.value) : e.target.value;

	if(name === "datasetSize") e.target.value = Math.trunc(parseFloat(value));

	console.log(_chartfactory.newDatasetFormInputs);

	_chartfactory.newDatasetFormInputs[name].value = e.target.value;
	newChartDatasetPostData[name] = value;
	submitButton.disabled = !_chartfactory.isSubmitButtonActive();
	
}


//Attach eventListener to New Password Form data Submission event
form.addEventListener("submit", submitNewChartDatasetData);


const formData = new FormData(form);


for (const [key, value] of formData.entries()) {
	newChartDatasetPostData[key] = value;
	console.log(key, value)
}

console.log(newChartDatasetPostData)


function handleBtnClick() {
	console.log(newChartDatasetPostData)
}

//////////////////////////////////////////////////////////////////////////////////
//callback function for ONSUBMIT EventListener
function submitNewChartDatasetData(event) {
	event.preventDefault(); // Prevent default form submission

	console.log('kfjaldjflkdjj-----ppppppppppppppppppppp')

	
	const formData = new FormData(form);


	for (const [key, value] of formData.entries()) {
		newChartDatasetPostData[key] = value;
		console.log(key, value)
	}

	

	inputs.forEach((item) => item.removeEventListener("input", inputHandler));
}
