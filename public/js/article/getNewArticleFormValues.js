const form = document.getElementById("new-article-form");
const inputValidationText = document.querySelector(".new-article-valid-input");
const submitButton = document.getElementById("get-article-form-values");
const articleScienceBranch = document.getElementById("articleScienceBranch");

var newArticlePostData = {}; //this object for storing POST request body

//obtain query string by id
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const procedureId = urlParams.get("procedureId");


//Preset New Article Form fields with initial values using GLOBAL ARTICLE FACTORY
Object.entries(_articlefactory.newArticleFormInputs).forEach(([key, obj]) => {
	if (key === "procedureAssociated")
		form.elements[key].checked = obj.checked;
	else form.elements[key].value = obj.value;
	submitButton.disabled = !_articlefactory.isSubmitButtonActive();
});



//Generate article category list
// Create a new blank option
const blankOption = document.createElement('option');
blankOption.value = ''; // Set an empty value
// Add the blank option to the beginning of the select element
blankOption.innerText = "Select a category..."
blankOption.style.fontStyle = "italic";
articleScienceBranch.prepend(blankOption);
// Make the blank option selected
blankOption.selected = true;

Object.entries(articleCategoryCollection).forEach(([key, obj]) => {
	const option = document.createElement("option");
	option.value = key;
	option.textContent = key;
	articleScienceBranch.appendChild(option);

});

//Attach eventListener callbacks to all New Article Form Inputs to guide input entry events
var inputs = document.querySelectorAll("input, textarea, select");
for (i = 0; i < inputs.length; i++) {
	if(inputs[i].getAttribute('class') !== "math-jax-script") inputs[i].oninput = inputHandler;
}


//this function handles New Article Form input events
//updates GLOBAL ARTICLE FACTORY New Article Form Inputs object
function inputHandler(e) {
	let name = e.target.name;
	let value = e.target.value;

	//display input validation rule message
	inputValidationText.innerText = _articlefactory.isValidationRuleApplied(name, value).rule;

	//update GLOBAL ARTICLE FACTORY New Article Form Inputs object
	
	if (name === "procedureAssociated") {
		_articlefactory.newArticleFormInputs[name].checked = e.target.checked;   //use event.target.checked attribute for checkboxes only

	} 	
	else if (name == "calibrationProcedures") {
		if(!_articlefactory.newArticleFormInputs[name].value.includes(value)) _articlefactory.newArticleFormInputs[name].value.push(value);
		calibrationProcedureQuantity.innerText = _articlefactory.newArticleFormInputs[name].value.length;
	}
	else {
		_articlefactory.newArticleFormInputs[name].value = value;		
		submitButton.disabled = !_articlefactory.isSubmitButtonActive();   //disables SUBMIT button if empty string detected for required user input
	}

	//higlights field input border based upon emptiness of the input
	_articlefactory.isFormInputFieldEmpty(name) ? e.target.style.border = "3px solid red" : e.target.style.border = "2px solid blue";
}





//Attach event listener to New Article Form submit event
form.addEventListener("submit", submitNewArticleData);

//this function prepares New Article Form data for POST request submission
function submitNewArticleData(event) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(form);

    //prepare POST request body data from New Article Form inputs using GLOBAL ARTICLE FACTORY
	for (const [key, value] of formData.entries()) {
			newArticlePostData[key] = value;
	}

	if(_articlefactory.newArticleFormInputs["calibrationProcedures"].value.length > 0) {
		newArticlePostData["calibrationProcedures"] = _articlefactory.newArticleFormInputs["calibrationProcedures"].value;
		DeleteKeys(newArticlePostData, ["paragraphQuantity", "procedureAssociated"]);
	}else{
		DeleteKeys(newArticlePostData, ["paragraphQuantity", "procedureAssociated", "calibrationProcedures"]);
	}

	//reset New Article Form Inputs object in GLOBAL ARTICLE FACTORY
	_articlefactory.resetNewArticleFormInputs(); 

	//send POST request to create new article record
    inputs.forEach((item) => item.removeEventListener("input", inputHandler));
}
