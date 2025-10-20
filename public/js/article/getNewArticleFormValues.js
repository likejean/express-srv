const form = document.getElementById("new-article-form");
const inputValidationText = document.querySelector(".new-article-valid-input");
const submitButton = document.getElementById("get-article-form-values");

var newArticlePostData = {}; //this object for storing POST request body

//obtain query string by id
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const procedureId = urlParams.get("procedureId");

//Preset New Article Form fields with initial values using GLOBAL ARTICLE FACTORY
Object.entries(_articlefactory.newArticleFormInputs).forEach(([key, obj]) => {	
	form.elements[key].value = obj.value;
	submitButton.disabled = !_articlefactory.isSubmitButtonActive();
});

//Attach eventListener callbacks to all New Article Form Inputs to guide input entry events
var inputs = document.querySelectorAll("input, textarea");
for (i = 0; i < inputs.length; i++) {
	inputs[i].oninput = inputHandler;
}

function inputHandler(e) {
	let name = e.target.name;
	let value = e.target.value;

	inputValidationText.innerText = _articlefactory.isValidationRuleApplied(name, value).rule;

	_articlefactory.newArticleFormInputs[name].value = value;
	submitButton.disabled = !_articlefactory.isSubmitButtonActive();   //disables SUBMIT button if empty string detected for required user input


	//higlights field input border based upon emptiness of the input
	_articlefactory.isFormInputFieldEmpty(name) ? e.target.style.border = "3px solid red" : e.target.style.border = "2px solid blue";
}

form.addEventListener("submit", submitNewArticleData);

//this function prepares New Article Form data for POST request submission

function submitNewArticleData(event) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(form);

    //prepare POST request body data from New Article Form inputs using GLOBAL ARTICLE FACTORY
	for (const [key, value] of formData.entries()) {		
		if (key !== "paragraphQuantity") newArticlePostData[key] = value;
	}
	_articlefactory.resetNewArticleFormInputs(); //reset GLOBAL ARTICLE FACTORY New Article Form Inputs object

	//add procedureId to POST request body
	newArticlePostData["procedureId"] = procedureId;
	console.log(newArticlePostData);
	//send POST request to create new article record
    inputs.forEach((item) => item.removeEventListener("input", inputHandler));
}
