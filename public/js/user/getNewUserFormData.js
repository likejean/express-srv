const form = document.getElementById("new-user-form");
const avatarImg = document.getElementById("user-register-avatar-image");
const submitButton = document.getElementById("get-register-user-form-values");


var newUserPostData = {};  //this object for storing POST request body


//Preset NewUserForm fields with initial values using GLOBAL USER FACTORY
Object.entries(_userfactory.newUserFormInputs).forEach(([key, obj]) => {
	//initialize all form fields except avatar file input (which must be empty by default)
    if(key !== "avatar") form.elements[key].value = obj.value;
	//initialize the form with missing image icon if image file is not being selected
	avatarImg.src = "../../img/avatars/MissingAvatarIcon.png";
	//deactivate submission button if not all required field are filled out by a user
    submitButton.disabled = !_userfactory.isSubmitButtonActive();
});

//Attach eventListener to New User Form data change event
form.addEventListener("change", (event) => {
	if (event.target.name === "avatar") _userfactory.newUserFormInputs["avatar"].noFileChosen = false;
	submitButton.disabled = !_userfactory.isSubmitButtonActive();
});

//Attach eventListener to New User Form data Submission event
form.addEventListener("submit", submitNewUserData);

//callback funciton for ONSUBMIT EventListener
function submitNewUserData (event) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(form);

	// Loop through all form data and prepare data object for POST request
    for (const [key, value] of formData.entries()) {
        newUserPostData[key] = value;
    }
	createNewUserRecord();
}





