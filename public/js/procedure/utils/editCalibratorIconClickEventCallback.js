///Callback function for ONCLICK eventListener in editProcedureEvent.html file...
////.......  icon.addEventListener('click', editProcedureIconClickEventCallback);
function editCalibratorIconClickEventCallback(event) {
	
	//construct wrapper name to access procedure factory collections
	const wrapperName = trimBySubstring(event.target.id, "Icon").concat("Wrapper");
	const wrapper = document.getElementById(wrapperName);

	let input = document.createElement(_procfactory.inputWrappers[wrapperName].tag);
	let icon = document.getElementById(_procfactory.inputWrappers[wrapperName].attributes.name.concat("Icon"));

	const patchButton = document.getElementById("patch-cal-record");

// 	creates toggle functionality for icons in Calibration Summary Card
	if (!_procfactory.inputWrappers[wrapperName].status) {
		//replace ellipsis-vertical icon with file-open icon to signify edit mode
		icon.classList.replace("fa-ellipsis-vertical", "fa-file-pen");

		//reserve the previous html child nodes in the calibration factory
		_procfactory.inputWrappers[wrapperName].childNodes = Array.from(wrapper.childNodes);
		//initialize value of the edit input
		input.value = wrapper.textContent;		

		//remove all child nodes of the text wrapper
		removeAllChildNodes(wrapper);
		//activate edit mode for targeted text wrapper
		_procfactory.inputWrappers[wrapperName].status = true;

		//add classes, attributes and append the edit input to empty wrapper
		_procfactory.inputWrappers[wrapperName].classes.forEach(item => input.classList.add(item));

		Object.entries(_procfactory.inputWrappers[wrapperName].attributes).forEach(([key, value]) => {
			input.setAttribute(key, value);
		});
		
		wrapper.appendChild(input);

		//attach event listener to edit input
		input.addEventListener("input", editCalibratorInputChangeValueCallback);
		patchButton.disabled = !_procfactory.isPatchButtonActive();

	} else {

		//reverse changes to original wrapper state and calibration factory
		input.removeEventListener("input", editCalibratorInputChangeValueCallback);
		document.getElementById("inputErrorMessage").textContent = "";
		removeAllChildNodes(wrapper);
		icon.classList.replace("fa-file-pen", "fa-ellipsis-vertical");
		_procfactory.inputWrappers[wrapperName].status = false;
		wrapper.append(..._procfactory.inputWrappers[wrapperName].childNodes);
		_procfactory.inputWrappers[wrapperName].childNodes = [];
		patchButton.disabled = !_procfactory.isPatchButtonActive();
	}
}
