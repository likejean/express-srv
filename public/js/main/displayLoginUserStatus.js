function displayLoginUserStatus() {
	if(window.localStorage.getItem("token") !== null) {
		console.log(window.localStorage.getItem("token"))
		document.getElementById("logout-anchor").style.visibility = "visible";
		document.getElementById("login-anchor").style.visibility = "hidden";
	}
	else {
		console.log(window.localStorage.getItem("token"))
		document.getElementById("login-anchor").style.visibility = "visible";
		document.getElementById("logout-anchor").style.visibility = "hidden";
	}
}

displayLoginUserStatus();