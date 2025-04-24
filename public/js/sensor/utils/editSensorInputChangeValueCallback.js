//////////Callback function for ONCHANGE eventListener in "editSensorIconClickEventCallback.js"
//this callback is used to handle the change event of the edit input in the sensor summary card
//it is used to update the value of the sensor in the sensor factory and display a warning message if the input is invalid
function editSensorInputChangeValueCallback(event) {
    // Get the new value from the input field
    const newValue = event.target.value;
    const concatInputName = event.target.name.concat("Wrapper");

    //Display warning message at the bottom of the card for any invalid input entries
    _sensfactory.inputWrappers[concatInputName].validator &&
    _sensfactory.inputWrappers[concatInputName].validator(newValue)
        ? (document.getElementById("inputErrorMessage").textContent = "")
        : (document.getElementById("inputErrorMessage").textContent =
        _sensfactory.inputWrappers[concatInputName].inputRule);

	// Update the value in the sensor factory
	_sensfactory.inputWrappers[concatInputName].value = newValue;
}
