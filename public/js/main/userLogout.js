//This script handles user logout by clearing local storage and reloading the page
function userLogout () {
	localStorage.clear();
	window.location.reload();
}