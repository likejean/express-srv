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
		if (wrapperName === "articleMathJaxWrapper") {
			// MathLive exposes its value separately from the preview text.
			input.value = _articlefactory.inputWrappers[wrapperName].value;
		}
		
		//remove all child nodes of the text wrapper
		removeAllChildNodes(wrapper);
		
		//activate edit mode for targeted text wrapper
		_articlefactory.inputWrappers[wrapperName].status = true;

		//add classes, attributes and append the edit input to empty wrapper
		_articlefactory.inputWrappers[wrapperName].classes.forEach(item => input.classList.add(item));

		Object.entries(_articlefactory.inputWrappers[wrapperName].attributes).forEach(([key, value]) => {
			input.setAttribute(key, value);
		});
		if (wrapperName === "articleContentWrapper") input.id = "articleContent";
		
		//append edit input to the wrapper
		wrapper.appendChild(input);
		if (wrapperName === "articleContentWrapper") {
			input.style.display = "none";
			const editorElement = document.createElement("div");
			editorElement.id = "articleContentEditor";
			wrapper.appendChild(editorElement);
			window.articleContentEditor = initializeRichTextArticleContentEditor(
				editorElement,
				input,
				input.value,
				(value) => {
					_articlefactory.inputWrappers.articleContentWrapper.value = value;
					editArticleInputChangeValueCallback({ target: input });
				}
			);
			const formulaControls = document.createElement("div");
			formulaControls.className = "mt-3 p-2 border rounded bg-light";
			formulaControls.innerHTML = `
				<label for="articleContentFormulaEditor" class="form-label">Insert formula into content</label>
				<div class="d-flex gap-2 align-items-center">
					<math-field id="articleContentFormulaEditor" class="form-control math-jax-script" placeholder="Build an inline formula"></math-field>
					<button id="insertArticleContentFormula" type="button" class="btn btn-outline-primary text-nowrap">Insert formula</button>
				</div>
				<small class="form-text text-muted">Place the cursor in the article text, build a formula, then insert it there.</small>`;
			wrapper.appendChild(formulaControls);
			attachArticleContentFormulaInsertion();
		}

		//attach event listener to edit input
		input.addEventListener("input", editArticleInputChangeValueCallback);
		patchButton.disabled = !_articlefactory.isPatchButtonActive();

	} else {

		//reverse changes to original wrapper state and calibration factory
		input.removeEventListener("input", editArticleInputChangeValueCallback);
		document.getElementById("inputErrorMessage").textContent = "";
		removeAllChildNodes(wrapper);
		if (wrapperName === "articleContentWrapper") window.articleContentEditor = null;
		icon.classList.replace("fa-file-pen", "fa-ellipsis-vertical");
		_articlefactory.inputWrappers[wrapperName].status = false;
		wrapper.append(..._articlefactory.inputWrappers[wrapperName].childNodes);
		_articlefactory.inputWrappers[wrapperName].childNodes = [];
		patchButton.disabled = !_articlefactory.isPatchButtonActive();
	}
}
