const passwordForm = document.getElementById("user-account-password");
//const newUserPasswordSubmitButton = document.getElementById("get-user-account-password-form-values");

var newPasswordPostData = {};  //this object for storing POST request body


//Attach eventListener to New Password Form data Submission event
passwordForm.addEventListener("submit", submitNewPasswordData);

//callback funciton for ONSUBMIT EventListener
function submitNewPasswordData (event) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(passwordForm);

	// Loop through all form data and prepare data object for POST request
    for (const [key, value] of formData.entries()) {
        newPasswordPostData[key] = value;
    }
	newPasswordPostData["email"] = window.localStorage.getItem("userEmail");

	updateUserPassword();
}