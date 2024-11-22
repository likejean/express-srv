//////////Callback function for ONCHANGE eventListener in "editUserAccountInfoEventCallback.js"

function editUserAccountInfoChangeValueCallback(event) {
    // Get the new value from the input field
    const newValue = event.target.value;
    const concatInputName = event.target.name.concat("Wrapper");

    //Display warning message at the bottom of the card for any invalid input entries
    _userfactory.inputWrappers[concatInputName].validator &&
    _userfactory.inputWrappers[concatInputName].validator(newValue)
        ? (document.getElementById("inputErrorMessage").textContent = "")
        : (document.getElementById("inputErrorMessage").textContent =
        _userfactory.inputWrappers[concatInputName].inputRule);

	_userfactory.inputWrappers[concatInputName].value = newValue;
}
