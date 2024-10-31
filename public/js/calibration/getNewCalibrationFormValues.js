const form = document.getElementById("new-calibration-form");
const submitButton = document.getElementById("get-calibration-form-values");

var newCalibrationPostData = {}; //this object for storing POST request body

//Preset New Calibration Form fields with initial values using GLOBAL CALIBRATION FACTORY
Object.entries(_calfactory.newCalRecordFormInputs).forEach(([key, obj]) => {
    if (key === "adjustmentsMade" || key === "calibrationExtended")
      form.elements[key].checked = obj.checked;
    else form.elements[key].value = obj.value;
    submitButton.disabled = !_calfactory.isSubmitButtonActive();
});

//Attach eventListeners to all New Calibration Form Inputs to detect input entry events
var inputs = document.querySelectorAll("input, select, textarea");
for (i = 0; i < inputs.length; i++) {
  inputs[i].oninput = inputHandler;
}


//callback input handler function for ONINPUT EventListener
function inputHandler(e) {
    let value = e.target.value;
    let name = e.target.name;

    _calfactory.newCalRecordFormInputs[name].value = value;
    submitButton.disabled = !_calfactory.isSubmitButtonActive();

    _calfactory.isFormInputFieldEmpty(name)
        ? (e.target.style.border = "2px solid red")
        : (e.target.style.border = "2px solid blue");
  }

//Attach eventListener to New Calibration Procedure Form data Submission event
form.addEventListener("submit", submitNewCalibrationData);

//callback funciton for ONSUBMIT EventListener
function submitNewCalibrationData(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(form);

    //Unable to obtain data from checkboxes inside form. TBD
    newCalibrationPostData["calibrationExtended"] = false;
    newCalibrationPostData["adjustmentsMade"] = true;

    // Loop through all form data and prepare data object for POST request
    for (const [key, value] of formData.entries()) {

        if(key === "sensorId") newCalibrationPostData[key] = _store.getSensorNames()[value];
        else if(key === "procedureId") newCalibrationPostData[key] = _store.getCalProcedureNames()[value];        
        else if(key === "calibrationExtended" || key === "adjustmentsMade") newCalibrationPostData[key] = false;
        else key == "calibrationRangePercent"
          ? (newCalibrationPostData[key] = Number(value))
          : (newCalibrationPostData[key] = value);
    }

    inputs.forEach((item) => item.removeEventListener("input", inputHandler));
}
