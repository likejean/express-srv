function userAuthNotification(emailSpan, authSpan, textColor, userEmail, authStatus) {
    document.getElementById(emailSpan).innerText = userEmail;
    document.getElementById(authSpan).innerText = authStatus;
    document.getElementById(authSpan).style.color = textColor;
    document.getElementById(authSpan).style.fontWeight = "bold";
}

if(localStorage.getItem("userEmail")) {
    userAuthNotification("auth-email-home-page", "auth-status-home-page", localStorage.getItem("userEmail"), "logged in.");
                
    axios.post("../api/users/verifyToken", {userEmail: localStorage.getItem("userEmail")}, {
        headers: getRequestHeaders()
    })
    .then(response => {
        const tokenValid = response.data.tokenValid;
        tokenValid && userAuthNotification("auth-email-home-page", "auth-status-home-page", "green", localStorage.getItem("userEmail"), "logged in.");
        
		return axios.get(`../api/users/${localStorage.getItem("userId")}`)
			.then(response => {
				const userAvatar = response.data.user.image.avatar.data;			
				localStorage.setItem("userAvatar", JSON.stringify(userAvatar));				
			})
			.catch((error) => {
				console.error(error.response);
			})

    })
    .catch(() => {
            userAuthNotification("auth-email-home-page", "auth-status-home-page", "red", localStorage.getItem("userEmail"), "login session expired.");
        }
    );			
}else{
    userAuthNotification("auth-email-home-page", "auth-status-home-page", "black", "You are", "not logged in.");
}