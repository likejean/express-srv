function createNewUserRecord() {
	//use POST API endpoint to create new sensor
	console.log(newUserPostData);
	// axios
	// .post(`../api/users/register`, newUserPostData)
	// .then((response) => {
	// 	console.log("New sensor created successfully:", response);
	// 	form.removeEventListener("submit", submitNewUserData);
	// 	//window.location.href = "../index.html";
	// })
	// 	.catch((error) => {
	// 	console.log("ERROR:", error);
	// });

	const formData = new FormData();

  	formData.append('avatar', newUserPostData.avatar);
	formData.append('email', newUserPostData.email);
	formData.append('usernmae', newUserPostData.username);
	formData.append('password', newUserPostData.password);
	formData.append('firstname', newUserPostData.firstname);
	formData.append('lastname', newUserPostData.lastname);
	formData.append('age', newUserPostData.age);
	formData.append('aboutYourself', newUserPostData.aboutYourself);


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
