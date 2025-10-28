
const mathJaxInput = document.querySelector(".math-jax-script");
const mathJaxOutput = document.querySelector(".math-jax-formula");
const mathJaxTranslation = document.querySelector(".math-jax-translation")

mathJaxInput.addEventListener("input", mathJaxInputChangevalueCallback);


function mathJaxInputChangevalueCallback (event) {
	mathJaxOutput.innerText = "$$" + event.target.value + "$$";
	MathJax.typesetPromise([mathJaxTranslation]);
}