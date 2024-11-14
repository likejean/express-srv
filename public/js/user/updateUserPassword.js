function updateUserPassword() {
	//obtain query string by id
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	let id = urlParams.get("id");

	axios.patch(`../api/users/updatePassword/${id}`, newPasswordPostData)
		.then((response) => {
			console.log(response.data);
		})
		.catch((error) => {
			console.error("Error: failed to update user password", error.response);
			
    });
}
