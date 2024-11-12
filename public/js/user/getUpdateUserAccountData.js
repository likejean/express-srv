const form = document.getElementById("user-account-avatar");
const userAccountAvatarImg = document.getElementById("user-profile-avatar-image");
const userProfileAvatarSubmitButton = document.getElementById("get-user-account-avatar-form-values");


var avatarPostData = {};  //this object for storing POST request body

//initialize the form with missing image icon if image file is not being selected
userAccountAvatarImg.src = "../../img/avatars/MissingAvatarIcon.png";

//Preset NewUserForm fields with initial values using GLOBAL USER FACTORY
Object.entries(_userfactory.newUserFormInputs).forEach(([key, obj]) => {	
	//initialize all form fields except avatar file input (which must be empty by default)
    if(key !== "avatar" && (key === "description" || key === "title")) form.elements[key].value = obj.value;	
	//deactivate submission button if not all required field are filled out by a user
    userProfileAvatarSubmitButton.disabled = !_userfactory.isSubmitButtonActive();
});

//Attach eventListener to New User Form data change event
form.addEventListener("change", (event) => {
	if (event.target.name === "avatar") _userfactory.newUserFormInputs["avatar"].noFileChosen = false;
	userProfileAvatarSubmitButton.disabled = !_userfactory.isSubmitButtonActive();
});


//Attach eventListener to New User Form data Submission event
form.addEventListener("submit", submitNewAvatarImageData);

//callback funciton for ONSUBMIT EventListener
function submitNewAvatarImageData (event) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(form);

	// Loop through all form data and prepare data object for POST request
    for (const [key, value] of formData.entries()) {
        avatarPostData[key] = value;
    }
	updateUserAvatarImage();
}