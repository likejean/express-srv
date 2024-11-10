function displayLoginUserStatus() {
	if(window.localStorage.getItem("token") !== null) {
		document.getElementById("logout-anchor").style.visibility = "visible";
		//document.getElementById("login-anchor").style.visibility = "hidden";
		hideAndShrink(document.getElementById("login-anchor"));
		
	}
	else {
		console.log(window.localStorage.getItem("token"))
		document.getElementById("login-anchor").style.visibility = "visible";
		//document.getElementById("logout-anchor").style.visibility = "hidden";
		hideAndShrink(document.getElementById("logout-anchor"));		
	}
}


function hideAndShrink(element) {
	element.style.visibility = "hidden";
	element.style.height = "0";
	element.style.width = "0";
	element.style.padding = "0";
	element.style.margin = "0";
}

displayLoginUserStatus();