const form = document.getElementById("new-procedure-form");
const validationMassage = document.getElementById("range-levels-validation");
const procFormModalHeaderText = document.querySelector(".new-cal-procedure-modal-header");
const submitButton = document.getElementById("get-procedure-form-values");

var newProcedurePostData = {}; //this object for storing POST request body

//Preset NewSensorForm fields with initial values using GLOBAL PROCEDURE FACTORY
Object.entries(_procfactory.newCalProcedureFormInputs).forEach(([key, obj]) => {
    form.elements[key].value = obj.value;
    submitButton.disabled = !_procfactory.isSubmitButtonActive();
});

//Attach eventListeners to all New Procedure Form Inputs to detect input entry events
var inputs = document.querySelectorAll("input, select, textarea");
for (i = 0; i < inputs.length; i++) {
    inputs[i].oninput = inputHandler;
    inputs[i].addEventListener('keydown', function(event) {
        if (event.key === '"') { // Check if the pressed key is '"'
            event.preventDefault(); // Prevent the default action (typing the character)
        }
    });
}

//callback input handler function for ONINPUT EventListener
function inputHandler(e) {
    let value = e.target.value;
    let name = e.target.name;

    _procfactory.newCalProcedureFormInputs[name].value = value;
    submitButton.disabled = !_procfactory.isSubmitButtonActive();

    if (_procfactory.isFormInputFieldEmpty(name)) e.target.style.border = "2px solid red";
    else e.target.style.border = "2px solid blue";

    if (name == "startRangeLevel" || name == "endRangeLevel") {
        _procfactory.isEndRangeLevelGreater()
        ? (validationMassage.innerText = "")
        : (validationMassage.innerText =
            "Attention!!! Upper range limit cannot be less or equal lower range limit");
    }
}

//Attach eventListener to New Calibration Procedure Form data Submission event
form.addEventListener("submit", submitNewProcedureData);

//callback funciton for ONSUBMIT EventListener
function submitNewProcedureData(event) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(form);

    //concatenate and populate procedure name in modal header
    procFormModalHeaderText.innerText = "Calibration Procedure:\u00a0{" 
    + _procfactory.newCalProcedureFormInputs["startRangeLevel"].value + "-" 
    + _procfactory.newCalProcedureFormInputs["endRangeLevel"].value + "\u00a0"
    + _procfactory.newCalProcedureFormInputs["units"].value + "}";

    // Loop through all form data and prepare data object for POST request
    for (const [key, value] of formData.entries()) {
        key == "startRangeLevel" || key == "endRangeLevel"
        ? (newProcedurePostData[key] = Number(value))
        : (newProcedurePostData[key] = value);
    }

    inputs.forEach((item) => item.removeEventListener("input", inputHandler));
}
