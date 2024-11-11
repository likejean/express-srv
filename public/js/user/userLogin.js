function userLogin() {
	axios.post(`../api/users/login`, loginUserPostData)
		.then(response => {
			const token = response.data.token;
			const email = response.data.user.email;
			const id = response.data.user.userId;
			
			window.localStorage.setItem("token", token);
			window.localStorage.setItem("userEmail", email);
			window.localStorage.setItem("userId", id);
						
			console.log('User logged in successfully:', response);

			return axios.get(`../api/users/${id}`)
				.then(response => {
					window.localStorage.setItem("userAvatar", JSON.stringify(response.data.user.image.avatar.data));
					window.location.href = "../../index.html";
				})
				.catch(error => {
					console.error(error);
			});
		})
		.catch(error => {
			console.error(error);
	});
}