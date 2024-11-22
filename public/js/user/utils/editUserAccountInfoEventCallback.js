function editUserAccountInfoClickEventCallback (event) {
	
	//construct wrapper name to access sensor factory collections
	const wrapperName = trimBySubstring(event.target.id, "Icon").concat("Wrapper");
	const wrapper = document.getElementById(wrapperName);
	let input = document.createElement(_userfactory.inputWrappers[wrapperName].tag);
	let icon = document.getElementById(_userfactory.inputWrappers[wrapperName].attributes.name.concat("Icon"));
	const patchButton = document.getElementById("patch-user-info-record");

	//creates toggle functionality for icons in Sensor Summary Card
	if (!_userfactory.inputWrappers[wrapperName].status) {
		//replace ellipsis-vertical icon with file-open icon to signify edit mode
		icon.classList.replace("fa-ellipsis-vertical", "fa-file-pen");

		//reserve the previous html child nodes in the sensor factory
		_userfactory.inputWrappers[wrapperName].childNodes = Array.from(wrapper.childNodes);

		//remove all child nodes of the text wrapper

		removeAllChildNodes(wrapper);
		//activate edit mode for targeted text wrapper
		_userfactory.inputWrappers[wrapperName].status = true;

		//add classes, attributes and append the edit input to empty wrapper
		_userfactory.inputWrappers[wrapperName].classes.forEach(item => input.classList.add(item));

		//add all attributes specified in sensor global factory
		Object.entries(_userfactory.inputWrappers[wrapperName].attributes).forEach(([key, value]) => {
			input.setAttribute(key, value);
		});
		
		wrapper.appendChild(input);		
		input.addEventListener("input", editUserAccountInfoChangeValueCallback);
		patchButton.disabled = !_userfactory.isPatchButtonActive();

	} else {

		//reverse changes to original wrapper state and sensor global factory
		input.removeEventListener("input", editUserAccountInfoChangeValueCallback);
		document.getElementById("inputErrorMessage").textContent = "";
		removeAllChildNodes(wrapper);
		icon.classList.replace("fa-file-pen", "fa-ellipsis-vertical");
		_userfactory.inputWrappers[wrapperName].status = false;
		wrapper.append(..._userfactory.inputWrappers[wrapperName].childNodes);
		_userfactory.inputWrappers[wrapperName].childNodes = [];		
		patchButton.disabled = !_userfactory.isPatchButtonActive();
	}

}