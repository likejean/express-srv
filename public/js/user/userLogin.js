function userLogin() {
	const modal = document.getElementById('user-login-auth-error-modal');	
	const span = document.getElementById('error-text-content');
	const details = document.getElementById('probable-root-cause');
	const alertTitle = document.getElementById('user-login-alert-title');
	const alertBody = document.getElementById('alert-body');

	new bootstrap.Modal(modal).show();
	
	if (alertBody.classList.contains('alert-danger')) alertBody.classList.replace('alert-danger', 'alert-success');
	span.innerText = "Loading...";
	alertTitle.innerText = "Please, Wait";

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

			alertBody.classList.remove('alert-success');
			alertBody.classList.add('alert-danger');
			alertTitle.innerText = "Error!";
			span.innerText = userLoginErrorTextContent;

			if (error.response.data.errorStatusCode == 1) details.innerText = "Incorrect username entered";
			else if (error.response.data.errorStatusCode == 2) details.innerText = "Incorrect password entered";
			else if (error.response.data.errorStatusCode == 3) details.innerText = "Possible Root Cause: No Internet Connection. Unable to connect to database..";
		
	});
}