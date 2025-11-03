///Callback function for ONCLICK eventListener in editArticleEvent.html file...
////.......  icon.addEventListener('click', editArticleIconClickEventCallback);
function editArticleIconClickEventCallback(event) {
	
	//construct wrapper name to access article factory collections
	const wrapperName = trimBySubstring(event.target.id, "Icon").concat("Wrapper");
	const wrapper = document.getElementById(wrapperName);

	let input = document.createElement(_articlefactory.inputWrappers[wrapperName].tag);
	let icon = document.getElementById(_articlefactory.inputWrappers[wrapperName].attributes.name.concat("Icon"));

	const patchButton = document.getElementById("patch-article-record");

// 	creates toggle functionality for icons in Calibration Summary Card
	if (!_articlefactory.inputWrappers[wrapperName].status) {
		//replace ellipsis-vertical icon with file-open icon to signify edit mode
		icon.classList.replace("fa-ellipsis-vertical", "fa-file-pen");

		//reserve the previous html child nodes in the calibration factory
		_articlefactory.inputWrappers[wrapperName].childNodes = Array.from(wrapper.childNodes);
		//initialize value of the edit input
		input.value = wrapper.textContent;		

		//remove all child nodes of the text wrapper
		removeAllChildNodes(wrapper);
		//activate edit mode for targeted text wrapper
		_articlefactory.inputWrappers[wrapperName].status = true;

		//add classes, attributes and append the edit input to empty wrapper
		_articlefactory.inputWrappers[wrapperName].classes.forEach(item => input.classList.add(item));

		Object.entries(_articlefactory.inputWrappers[wrapperName].attributes).forEach(([key, value]) => {
			input.setAttribute(key, value);
		});
		
		wrapper.appendChild(input);

		//attach event listener to edit input
		input.addEventListener("input", editArticleInputChangeValueCallback);
		patchButton.disabled = !_articlefactory.isPatchButtonActive();

	} else {

		//reverse changes to original wrapper state and calibration factory
		input.removeEventListener("input", editArticleInputChangeValueCallback);
		document.getElementById("inputErrorMessage").textContent = "";
		removeAllChildNodes(wrapper);
		icon.classList.replace("fa-file-pen", "fa-ellipsis-vertical");
		_articlefactory.inputWrappers[wrapperName].status = false;
		wrapper.append(..._articlefactory.inputWrappers[wrapperName].childNodes);
		_articlefactory.inputWrappers[wrapperName].childNodes = [];
		patchButton.disabled = !_articlefactory.isPatchButtonActive();
	}
}
