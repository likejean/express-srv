
const mathJaxEditor = document.querySelector("#mathJaxEditor");
const mathJaxScript = document.querySelector("#mathJaxScript");
const mathJaxOutput = document.querySelector(".math-jax-formula");
const mathJaxTranslation = document.querySelector(".math-jax-translation") || mathJaxOutput;

mathJaxEditor.addEventListener("input", mathJaxInputChangevalueCallback);

function mathJaxInputChangevalueCallback(event) {
	const latex = event.target.getValue("latex");

	// Update the hidden value, edit-page PATCH state, and live preview together.
	mathJaxScript.value = latex;
	mathJaxOutput.innerText = latex ? `$$${latex}$$` : "";
	const patchButton = document.getElementById("patch-article-record");
	if (_articlefactory.inputWrappers.articleMathJaxWrapper && patchButton) {
		_articlefactory.inputWrappers.articleMathJaxWrapper.value = latex;
		_articlefactory.inputWrappers.articleMathJaxWrapper.status = true;
		patchButton.disabled = false;
	}
	MathJax.typesetPromise([mathJaxTranslation]);
}