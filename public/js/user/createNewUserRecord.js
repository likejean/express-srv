function createNewUserRecord() {
	//use POST API endpoint to create new sensor	
	const formData = new FormData();

	Object.entries(_userfactory.newUserFormInputs).forEach(([key, val]) => {
		formData.append(key, newUserPostData[key]);
	});


	axios.post(`../api/users/register`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		.then(response => {
			console.log('Image uploaded successfully:', response);
		})
		.catch(error => {
			console.error('Error uploading image:', error);
	});
}
