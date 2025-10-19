const form = document.getElementById("new-calibration-form");
const inputValidationText = document.querySelector(".new-calibration-valid-input");
const calFormModalHeaderText = document.querySelector(".new-cal-record-modal-header");
const submitButton = document.getElementById("get-calibration-form-values");

var newCalibrationPostData = {}; //this object for storing POST request body

//Preset New Calibration Form fields with initial values using GLOBAL CALIBRATION FACTORY
Object.entries(_calfactory.newCalRecordFormInputs).forEach(([key, obj]) => {
	if (key === "adjustmentsMade" || key === "calibrationExtended")
		form.elements[key].checked = obj.checked;
	else form.elements[key].value = obj.value;
	submitButton.disabled = !_calfactory.isSubmitButtonActive();
});

//Attach eventListener callbacks to all New Calibration Form Inputs to guide input entry events
var inputs = document.querySelectorAll("input, select, textarea");
for (i = 0; i < inputs.length; i++) {
	inputs[i].oninput = inputHandler;
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////
//callback handler function for "ONINPUT" EventListener
function inputHandler(e) {
	let name = e.target.name;
	let value = name === "calibrationRangePercent" ? Number(e.target.value) : e.target.value;

	//if(name === "calibrationRangePercent") e.target.value = Math.trunc(parseFloat(value));

	inputValidationText.innerText = _calfactory.isValidationRuleApplied(name, value).rule;


	if (name === "calibrationExtended" || name === "adjustmentsMade") {
		_calfactory.newCalRecordFormInputs[name].checked = e.target.checked;   //use event.target.checked attribute for checkboxes only
	} else {
		_calfactory.newCalRecordFormInputs[name].value = value;
		submitButton.disabled = !_calfactory.isSubmitButtonActive();   //disables SUBMIT button if empty string detected for required user input
	}

	//higlights field input border based upon emptiness of the input
	if (_calfactory.isFormInputFieldEmpty(name)) {
		e.target.style.border = "3px solid red";
	} else {
		e.target.style.border = "2px solid blue";
	}
}



//Attach eventListener to New Calibration Procedure Form data Submission event
form.addEventListener("submit", submitNewCalibrationData);


//////////////////////////////////////////////////////////////////////////////////
//callback function for ONSUBMIT EventListener
function submitNewCalibrationData(event) {
	event.preventDefault(); // Prevent default form submission

	//prepare POST request body data from New Calibration Form inputs using GLOBAL CALIBRATION FACTORY
	const formData = new FormData(form);

	//NOTE!!!!!!Unable to obtain data from checkboxes inside form, so get the "checked" status directly from the calibration factory
	newCalibrationPostData["calibrationExtended"] = _calfactory.newCalRecordFormInputs["calibrationExtended"].checked;
	newCalibrationPostData["adjustmentsMade"] = _calfactory.newCalRecordFormInputs["adjustmentsMade"].checked;

	calFormModalHeaderText.innerText = "Calibration Record:\u00a0" + _calfactory.newCalRecordFormInputs["calibrationName"].value;

	// Loop through all form data and prepare data object for POST request
	for (const [key, value] of formData.entries()) {

		
		if (key === "sensorId") newCalibrationPostData[key] = _store.getSensorEIDs()[value];
		//get ObjectId instead of sensor name
		else if (key === "procedureId") newCalibrationPostData[key] = _store.getCalProcedureNames()[value];
		//get ObjectId instead of procedure name
		else if (key === "calibrationExtended" || key === "adjustmentsMade")
		//edge case: if form submission includes checkbox data, use calibration factory data instead
			newCalibrationPostData[key] =_calfactory.newCalRecordFormInputs[key].checked;
		else
			key == "calibrationRangePercent"
				? (newCalibrationPostData[key] = Number(value))
				: (newCalibrationPostData[key] = value);
	}

	inputs.forEach((item) => item.removeEventListener("input", inputHandler));
}
