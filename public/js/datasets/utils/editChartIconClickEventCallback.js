function editChartIconClickEventCallback (event) {
	
	//construct wrapper name to access sensor factory collections
	const wrapperName = trimBySubstring(event.target.id, "Icon").concat("Wrapper");
	const wrapper = document.getElementById(wrapperName);
	let input = document.createElement(_chartfactory.inputWrappers[wrapperName].tag);
	let icon = document.getElementById(_chartfactory.inputWrappers[wrapperName].attributes.name.concat("Icon"));
	const patchButton = document.getElementById("patch-chart-options");

	//creates toggle functionality for icons in Calibration Summary Card
	if (!_chartfactory.inputWrappers[wrapperName].status) {
		//replace ellipsis-vertical icon with file-open icon to signify edit mode
		icon.classList.replace("fa-ellipsis-vertical", "fa-file-pen");

		//reserve the previous html child nodes in the calibration factory
		_chartfactory.inputWrappers[wrapperName].childNodes = Array.from(wrapper.childNodes);
		//initialize value of the edit input
		input.value = wrapper.textContent;		

		//remove all child nodes of the text wrapper
		removeAllChildNodes(wrapper);
		//activate edit mode for targeted text wrapper
		_chartfactory.inputWrappers[wrapperName].status = true;

		//add classes, attributes and append the edit input to empty wrapper
		_chartfactory.inputWrappers[wrapperName].classes.forEach(item => input.classList.add(item));

		Object.entries(_chartfactory.inputWrappers[wrapperName].attributes).forEach(([key, value]) => {
			input.setAttribute(key, value);
		});
		
		wrapper.appendChild(input);

		//attach event listener to edit input
		input.addEventListener("input", editChartInputChangeValueCallback);
		patchButton.disabled = !_chartfactory.isPatchButtonActive(); 

	} else {

		//reverse changes to original wrapper state and calibration factory
		input.removeEventListener("input", editChartInputChangeValueCallback);
		document.getElementById("inputErrorMessage").textContent = "";
		removeAllChildNodes(wrapper);
		icon.classList.replace("fa-file-pen", "fa-ellipsis-vertical");
		_chartfactory.inputWrappers[wrapperName].status = false;
		wrapper.append(..._chartfactory.inputWrappers[wrapperName].childNodes);
		_chartfactory.inputWrappers[wrapperName].childNodes = [];
		patchButton.disabled = !_chartfactory.isPatchButtonActive();
	}
	
}