const form = document.getElementById("new-chart-dataset-form");
const submitButton = document.getElementById("get-chart-dataset-form-values");



var newChartDatasetPostData = {}; //this object for storing POST request body



//Attach eventListener callbacks to all New Chart Dataset Form Inputs to guide input entry events
var inputs = document.querySelectorAll("input, select");
for (i = 0; i < inputs.length; i++) {
	inputs[i].oninput = inputHandler;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
//callback handler function for "ONINPUT" EventListener
function inputHandler(e) {

	console.log(e.target.value)
	
}


//Attach eventListener to New Calibration Procedure Form data Submission event
form.addEventListener("submit", submitNewChartDatasetData);


//////////////////////////////////////////////////////////////////////////////////
//callback function for ONSUBMIT EventListener
function submitNewChartDatasetData(event) {
	event.preventDefault(); // Prevent default form submission

	const formData = new FormData(form);

	for (const [key, value] of formData.entries()) {
		console.log(key, value)
	}

	

	inputs.forEach((item) => item.removeEventListener("input", inputHandler));
}
