const avatarImage = document.getElementById("avatar");

// Attach an event listener to the file input field
// Check if the file is a PNG or JPEG and within the size limit
avatarImage.addEventListener("change", function() {
	const files = avatarImage.files;
	if (files.length > 0) {
		if(files[0].type !== "image/png" && files[0].type !== "image/jpeg") {
			alert("Please select a PNG or JPEG image.");
			avatarImage.value = ""; // Clear the input field
		} else if (files[0].size > 20 * 1024) { // 20kBytes limit
			alert("File size exceeds 20kBytes limit. Please choose a smaller file.");
			avatarImage.value = ""; // Clear the input field
		} else {
			// File is valid, proceed with your logic here
			console.log("File is valid:", files[0]);
			// Convert the file to base64 and set it to the image source
			const reader = new FileReader();
			reader.onload = function(event) {
				document.getElementById('user-profile-avatar-image').src = event.target.result;
			};
			reader.readAsDataURL(files[0]);
			
		}
	}else console.log("No file selected.");
});