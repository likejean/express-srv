function inputChangeValueCallback(event) {
  // Get the new value from the input field
  const newValue = event.target.value;
  const inputType = event.target.type;
  const concatInputName = event.target.name.concat("Wrapper");
  calibrationInputContainer[concatInputName].validator &&
  calibrationInputContainer[concatInputName].validator(newValue)
    ? (document.getElementById("inputErrorMessage").textContent = "")
    : (document.getElementById("inputErrorMessage").textContent =
        calibrationInputContainer[concatInputName].inputRule);
  if (inputType === "checkbox")
    calibrationInputContainer[concatInputName].checked = this.checked;
  else calibrationInputContainer[concatInputName].value = newValue;
}
