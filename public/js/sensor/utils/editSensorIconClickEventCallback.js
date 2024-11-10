
function editSensorIconClickEventCallback (event) {
	
	//construct wrapper name to access sensor factory collections
	const wrapperName = trimBySubstring(event.target.id, "Icon").concat("Wrapper");
	const wrapper = document.getElementById(wrapperName);
	let input = document.createElement(_sensfactory.inputWrappers[wrapperName].tag);
	let icon = document.getElementById(_sensfactory.inputWrappers[wrapperName].attributes.name.concat("Icon"));
	const patchButton = document.getElementById("patch-sensor-record");

	//console.log(wrapper, icon)
	//creates toggle functionality for icons in Sensor Summary Card
	if (!_sensfactory.inputWrappers[wrapperName].status) {
		//replace ellipsis-vertical icon with file-open icon to signify edit mode
		icon.classList.replace("fa-ellipsis-vertical", "fa-file-pen");

		//reserve the previous html child nodes in the sensor factory
		_sensfactory.inputWrappers[wrapperName].childNodes = Array.from(wrapper.childNodes);
		
		//initialize value of the edit input		
		wrapperName !== "calibrationPriorityWrapper" 
			? input.value = wrapper.textContent
			: input.innerHTML = selectionOptionsInnerHtmlString (wrapper.textContent);

		//remove all child nodes of the text wrapper
		removeAllChildNodes(wrapper);
		//activate edit mode for targeted text wrapper
		_sensfactory.inputWrappers[wrapperName].status = true;

		//add classes, attributes and append the edit input to empty wrapper
		_sensfactory.inputWrappers[wrapperName].classes.forEach(item => input.classList.add(item));

		//add all attributes specified in sensor global factory
		Object.entries(_sensfactory.inputWrappers[wrapperName].attributes).forEach(([key, value]) => {
			input.setAttribute(key, value);
		});
		
		wrapper.appendChild(input);

		//attach event listener to edit input
		input.addEventListener("input", editSensorInputChangeValueCallback);
		patchButton.disabled = !_sensfactory.isPatchButtonActive();
	} else {

		//reverse changes to original wrapper state and sensor global factory
		input.removeEventListener("input", editSensorInputChangeValueCallback);
		document.getElementById("inputErrorMessage").textContent = "";
		removeAllChildNodes(wrapper);
		icon.classList.replace("fa-file-pen", "fa-ellipsis-vertical");
		_sensfactory.inputWrappers[wrapperName].status = false;
		wrapper.append(..._sensfactory.inputWrappers[wrapperName].childNodes);
		_sensfactory.inputWrappers[wrapperName].childNodes = [];
		patchButton.disabled = !_sensfactory.isPatchButtonActive();
	}
}