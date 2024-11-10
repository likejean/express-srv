function userLogin() {
	console.log(loginUserPostData);

	axios.post(`../api/users/login`, loginUserPostData)
		.then(response => {
			const token = response.data.token;
			const email = response.data.user.email;
			const id = response.data.user.userId;

			window.localStorage.setItem("token", token);
			window.localStorage.setItem("userEmail", email);
			window.localStorage.setItem("userId", id);
			window.location.href = "../../index.html";
			console.log('User logged in successfully:', response);
		})
		.catch(error => {
			console.error(error);
	});
}