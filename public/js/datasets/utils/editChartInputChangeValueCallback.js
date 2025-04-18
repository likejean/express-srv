//////////Callback function for ONCHANGE eventListener in "editChartIconClickEventCallback.js"

function editChartInputChangeValueCallback(event) {

    // Get the new value from the input field
    const newValue = event.target.value;
    const concatInputName = event.target.name.concat("Wrapper");

    //Display warning message at the bottom of the card for any invalid input entries
    _chartfactory.inputWrappers[concatInputName].validator &&
    _chartfactory.inputWrappers[concatInputName].validator(newValue)
        ? (document.getElementById("inputErrorMessage").textContent = "")
        : (document.getElementById("inputErrorMessage").textContent =
        _chartfactory.inputWrappers[concatInputName].inputRule);

    //Update GLOBAL CALIBRATION FACTORY state upon each new value entered   
    _chartfactory.inputWrappers[concatInputName].value = newValue;

}