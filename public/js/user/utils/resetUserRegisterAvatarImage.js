const btn = document.getElementById("user-register-clear-avatar-button");
const fileInput = document.getElementById('avatar');	
const img = document.getElementById('user-register-avatar-image');

btn.addEventListener("click", clearFileInput);

//callback function for event listener to clear avatar image
function clearFileInput() {
	fileInput.value = ''; // This clears the file selection
	img.src = "../../img/avatars/MissingAvatarIcon.png"; //sets image viewer to its default image icon
	_userfactory.newUserFormInputs["avatar"].noFileChosen = true; //updates user globa factory
	userRegisterSubmitButton.disabled = !_userfactory.isSubmitButtonActive(); //disables the submission button
}

