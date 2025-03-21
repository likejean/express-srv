//////////Callback function for ONCHANGE eventListener in "editCalibrationIconClickEventCallback.js"

function editCalibrationInputChangeValueCallback(event) {
    // Get the new value from the input field
    const newValue = event.target.value;
    const inputType = event.target.type;    
    const concatInputName = event.target.name.concat("Wrapper");

    //Display warning message at the bottom of the card for any invalid input entries
    _calfactory.inputWrappers[concatInputName].validator &&
    _calfactory.inputWrappers[concatInputName].validator(newValue)
        ? (document.getElementById("inputErrorMessage").textContent = "")
        : (document.getElementById("inputErrorMessage").textContent =
        _calfactory.inputWrappers[concatInputName].inputRule);

    //Update GLOBAL CALIBRATION FACTORY state upon each new value entered
    if (inputType === "checkbox")
        _calfactory.inputWrappers[concatInputName].checked = this.checked;
    else _calfactory.inputWrappers[concatInputName].value = newValue;

}
