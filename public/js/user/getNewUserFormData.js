const form = document.getElementById("new-user-form");
const avatarImg = document.getElementById("avatar-image");
const submitButton = document.getElementById("get-register-user-form-values");


var newUserPostData = {};  //this object for storing POST request body


//Preset NewUserForm fields with initial values using GLOBAL USER FACTORY
Object.entries(_userfactory.newUserFormInputs).forEach(([key, obj]) => {
    form.elements[key].value = obj.value;
	avatarImg.src = "../../img/avatars/MissingAvatarIcon.png";
    //submitButton.disabled = !_userfactory.isSubmitButtonActive();
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

    console.log(newUserPostData);

}



