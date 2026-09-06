
const mathJaxEditor = document.querySelector("#mathJaxEditor");
const mathJaxScript = document.querySelector("#mathJaxScript");
const mathJaxOutput = document.querySelector(".math-jax-formula");
const mathJaxTranslation = document.querySelector(".math-jax-translation");

mathJaxEditor.addEventListener("input", mathJaxInputChangevalueCallback);

function mathJaxInputChangevalueCallback(event) {
	const latex = event.target.getValue("latex");

	mathJaxScript.value = latex;
	mathJaxOutput.innerText = latex ? `$$${latex}$$` : "";
	MathJax.typesetPromise([mathJaxTranslation]);
}