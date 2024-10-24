
function inputChangeValueCallback (event) {
    // Get the new value from the input field
    const newValue = event.target.value;
    const inputType = event.target.type;
    const concatInputName = event.target.name.concat("Wrapper");             
    if (inputType === "checkbox") calibrationInputContainer[concatInputName].checked = this.checked;
    else calibrationInputContainer[concatInputName].value = newValue;
  
}