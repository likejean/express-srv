function inputChangeValueCallback(event) {
    // Get the new value from the input field
    const newValue = event.target.value;
    const inputType = event.target.type;
    
    const concatInputName = event.target.name.concat("Wrapper");
    _calfactory.inputWrappers[concatInputName].validator &&
    _calfactory.inputWrappers[concatInputName].validator(newValue)
        ? (document.getElementById("inputErrorMessage").textContent = "")
        : (document.getElementById("inputErrorMessage").textContent =
        _calfactory.inputWrappers[concatInputName].inputRule);
    if (inputType === "checkbox")
        _calfactory.inputWrappers[concatInputName].checked = this.checked;
    else _calfactory.inputWrappers[concatInputName].value = newValue;
}
