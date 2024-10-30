const form = document.getElementById("new-calibration-form");
const submitButton = document.getElementById("get-calibration-form-values");

var newCalibrationPostData = {}; //this object for storing POST request body

//Preset New Calibration Form fields with initial values using GLOBAL CALIBRATION FACTORY
Object.entries(_calfactory.newCalRecordFormInputs).forEach(([key, obj]) => {
 
  if (key === "adjustmentsMade" || key === "calibrationExtended")
    form.elements[key].checked = obj.checked;
  else form.elements[key].value = obj.value;
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

  console.log(value, name);

  _calfactory.newCalRecordFormInputs[name].value = value;
  submitButton.disabled = !_calfactory.isSubmitButtonActive();

  if (_calfactory.isFormInputFieldEmpty(name))
    e.target.style.border = "2px solid red";
  else e.target.style.border = "2px solid blue";
}
