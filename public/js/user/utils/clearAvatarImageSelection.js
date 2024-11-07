function resetAvatarImageSelection () {
	const btn = document.getElementById("clear-avatar-image-selection");
	const fileInput = document.getElementById('avatar');

	//callback function for event listener to clear avatar image
	function clearFileInput() {
		fileInput.value = ''; // This clears the file selection
		avatarImg.src = "../../img/avatars/MissingAvatarIcon.png";
		_userfactory.newUserFormInputs["avatar"].noFileChosen = true;
		submitButton.disabled = !_userfactory.isSubmitButtonActive();
	}

	// Add an event listener to a button or any element that triggers the removal	
	btn.addEventListener('click', clearFileInput);
}