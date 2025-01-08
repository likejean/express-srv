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

					const avatar = response.data.user.image.avatar.data;
					const rank = response.data.user.level;
					
					window.location.href = "../../index.html";
					window.localStorage.setItem("userAvatar", JSON.stringify(avatar));
					window.localStorage.setItem("userLevel", rank);
							
				})
				.catch(error => {
					console.error(error);
			});
		})
		.catch(error => {
			console.error(error.response);
			
			const userLoginErrorTextContent = error.response.data.errorMessage;

			const modal = document.getElementById('user-login-auth-error-modal');
			const span = document.getElementById('error-text-content');

			new bootstrap.Modal(modal).show();
			span.innerText = userLoginErrorTextContent;
	});
}