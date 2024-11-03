//////////Callback function for ONCHANGE eventListener in "editSensorIconClickEventCallback.js"

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

	_sensfactory.inputWrappers[concatInputName].value = newValue;
}
