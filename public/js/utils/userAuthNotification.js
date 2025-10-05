//this function displays user authentication notification on the home page
//it is called in this file (userAuthNotification.js)
function userAuthNotification(emailSpan, authSpan, textColor, userEmail, authStatus) {
    document.getElementById(emailSpan).innerText = userEmail;
    document.getElementById(authSpan).innerText = authStatus;
    document.getElementById(authSpan).style.color = textColor;
    document.getElementById(authSpan).style.fontWeight = "bold";
}


//this function checks if user is logged in by verifying the token stored in localStorage
if(localStorage.getItem("userEmail")) {

	//user is logged in
	//display notification message on the home page
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
	//user is not logged in
	//display notification message on the home page
    userAuthNotification("auth-email-home-page", "auth-status-home-page", "black", "You are", "not logged in.");
}