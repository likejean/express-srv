//////////Callback function for ONCHANGE eventListener in "editCalibrationIconClickEventCallback.js"

function editCalibratorInputChangeValueCallback(event) {
    // Get the new value from the input field
    const newValue = event.target.value;  
    const concatInputName = event.target.name.concat("Wrapper");

    //Display warning message at the bottom of the card for any invalid input entries
    _procfactory.inputWrappers[concatInputName].validator &&
    _procfactory.inputWrappers[concatInputName].validator(newValue)
        ? (document.getElementById("inputErrorMessage").textContent = "")
        : (document.getElementById("inputErrorMessage").textContent =
        _procfactory.inputWrappers[concatInputName].inputRule);

    //Update GLOBAL CALIBRATION FACTORY state upon each new value entered
	_procfactory.inputWrappers[concatInputName].value = newValue;

}
