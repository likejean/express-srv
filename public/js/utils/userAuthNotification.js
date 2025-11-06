//this function displays user authentication notification on the home page
//it is called in this file (userAuthNotification.js)
function userAuthNotification(emailSpan, authSpan, textColor, userEmail, authStatus) {
    document.getElementById(emailSpan).innerText = userEmail;
	document.getElementById(emailSpan).style.color = "white";
	document.getElementById(emailSpan).style.fontSize = "25px";
    document.getElementById(authSpan).innerText = authStatus;
    document.getElementById(authSpan).style.color = textColor;
    document.getElementById(authSpan).style.fontWeight = "bold";
	document.getElementById(authSpan).style.fontSize = "25px";
}


//this function checks if user is logged in by verifying the token stored in localStorage
if(localStorage.getItem("userEmail")) {

	//user is logged in
	//display notification message on the home page
    userAuthNotification("auth-email-home-page", "auth-status-home-page", "white", localStorage.getItem("userEmail"), "logged in.");
                
    axios.post("../api/users/verifyToken", {userEmail: localStorage.getItem("userEmail")}, {
        headers: getRequestHeaders()
    })
    .then(response => {
        const tokenValid = response.data.tokenValid;
        tokenValid && userAuthNotification("auth-email-home-page", "auth-status-home-page", "green", localStorage.getItem("userEmail"), "logged in.");
        
		//fetch user avatar image from the server and store it in localStorage
		//this avatar image will be used in the navigation bar
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
		//token is not valid or expired
            userAuthNotification("auth-email-home-page", "auth-status-home-page", "red", localStorage.getItem("userEmail"), "login session expired.");
        }
    );			
}else{
	//user is not logged in
	//display notification message on the home page
    userAuthNotification("auth-email-home-page", "auth-status-home-page", "red", "You are", "not logged in.");
}