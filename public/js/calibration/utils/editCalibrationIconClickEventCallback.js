///Callback function for ONCLICK eventListener in editCalibrationEvent.html file...
////.......  icon.addEventListener('click', editCalibrationIconClickEventCallback);
function editCalibrationIconClickEventCallback(event) {
	
	//construct wrapper name to access calibration factory collections
	const wrapperName = trimBySubstring(event.target.id, "Icon").concat("Wrapper");
	const wrapper = document.getElementById(wrapperName);
	let input = document.createElement(_calfactory.inputWrappers[wrapperName].tag);
	let icon = document.getElementById(_calfactory.inputWrappers[wrapperName].attributes.name.concat("Icon"));
	const patchButton = document.getElementById("patch-cal-record");

	//creates toggle functionality for icons in Calibration Summary Card
	if (!_calfactory.inputWrappers[wrapperName].status) {
		//replace ellipsis-vertical icon with file-open icon to signify edit mode
		icon.classList.replace("fa-ellipsis-vertical", "fa-file-pen");

		//reserve the previous html child nodes in the calibration factory
		_calfactory.inputWrappers[wrapperName].childNodes = Array.from(wrapper.childNodes);
		//initialize value of the edit input
		input.value = wrapper.textContent;		

		//remove all child nodes of the text wrapper
		removeAllChildNodes(wrapper);
		//activate edit mode for targeted text wrapper
		_calfactory.inputWrappers[wrapperName].status = true;

		//add classes, attributes and append the edit input to empty wrapper
		_calfactory.inputWrappers[wrapperName].classes.forEach(item => input.classList.add(item));

		Object.entries(_calfactory.inputWrappers[wrapperName].attributes).forEach(([key, value]) => {
			input.setAttribute(key, value);
		});
		
		wrapper.appendChild(input);

		//attach event listener to edit input
		input.addEventListener("input", editCalibrationInputChangeValueCallback);
		patchButton.disabled = !_calfactory.isPatchButtonActive();

	} else {

		//reverse changes to original wrapper state and calibration factory
		input.removeEventListener("input", editCalibrationInputChangeValueCallback);
		document.getElementById("inputErrorMessage").textContent = "";
		removeAllChildNodes(wrapper);
		icon.classList.replace("fa-file-pen", "fa-ellipsis-vertical");
		_calfactory.inputWrappers[wrapperName].status = false;
		wrapper.append(..._calfactory.inputWrappers[wrapperName].childNodes);
		_calfactory.inputWrappers[wrapperName].childNodes = [];
		patchButton.disabled = !_calfactory.isPatchButtonActive();
	}
}
