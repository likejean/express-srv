function userLogout () {
	window.localStorage.removeItem('token');
	window.localStorage.removeItem('userEmail');
	window.localStorage.removeItem('userId');
	window.location.reload();
}