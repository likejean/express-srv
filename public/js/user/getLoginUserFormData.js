const form = document.getElementById("user-login-form");
const submitButton = document.getElementById("get-user-login-form-values");


var loginUserPostData = {};  //this object for storing POST request body

//Attach eventListener to Login User Form data Submission event
form.addEventListener("submit", submitUserLoginData);

//callback funciton for ONSUBMIT EventListener
function submitUserLoginData (event) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(form);

	// Loop through all form data and prepare data object for POST request
    for (const [key, value] of formData.entries()) {
        loginUserPostData[key] = value;
    }
	userLogin();
}
