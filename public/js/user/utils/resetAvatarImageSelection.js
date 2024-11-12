function resetAvatarImageSelection(buttonId, imageId) {
	console.log(buttonId, "--iii--",  imageId)
	const btn = document.getElementById(buttonId);
	const img = document.getElementById(imageId);
	console.log(btn); console.log(img)
	const fileInput = document.getElementById('avatar');

	//callback function for event listener to clear avatar image
	function clearFileInput() {
		
		fileInput.value = ''; // This clears the file selection
		img.src = "../../img/avatars/MissingAvatarIcon.png";
		_userfactory.newUserFormInputs["avatar"].noFileChosen = true;
		console.log(submitButton)
		if(submitButton) submitButton.disabled = !_userfactory.isSubmitButtonActive();
	}

	// Add an event listener to a button or any element that triggers the removal	
	btn.addEventListener('click', clearFileInput);
}