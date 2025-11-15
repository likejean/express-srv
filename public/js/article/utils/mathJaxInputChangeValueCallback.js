
const mathJaxInput = document.querySelector(".math-jax-script");
const mathJaxOutput = document.querySelector(".math-jax-formula");
const mathJaxTranslation = document.querySelector(".math-jax-translation")

mathJaxInput.addEventListener("input", mathJaxInputChangevalueCallback);

//this function updates the mathJax output upon each new value entered in the mathJax input field
function mathJaxInputChangevalueCallback (event) {
	mathJaxOutput.innerText = "$$" + event.target.value + "$$";
	MathJax.typesetPromise([mathJaxTranslation]);
}