//////////Callback function for ONCHANGE eventListener in "editArticleIconClickEventCallback.js"

// This function updates the GLOBAL _articlefactory state upon each new value entered in the edit article form input fields
function editArticleInputChangeValueCallback(event) {
    // Get the new value from the input field
    const newValue = event.target.value;  
    const concatInputName = event.target.name.concat("Wrapper");

    //Display warning message at the bottom of the card for any invalid input entries
    _articlefactory.inputWrappers[concatInputName].validator &&
    _articlefactory.inputWrappers[concatInputName].validator(newValue)
        ? (document.getElementById("inputErrorMessage").textContent = "")
        : (document.getElementById("inputErrorMessage").textContent =
        _articlefactory.inputWrappers[concatInputName].inputRule);

    //Update GLOBAL ARTICLE FACTORY state upon each new value entered
	_articlefactory.inputWrappers[concatInputName].value = newValue;

}
