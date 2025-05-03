// This function retrieves the token from local storage and returns an object with the Authorization header
// and Content-Type header. The Authorization header contains the token prefixed with 'Bearer ',
// and the Content-Type header is set to 'application/json'.
const getRequestHeaders = () => {
	const token = localStorage.getItem('token');
	return {
		Authorization: 'Bearer ' + token || '',
		'Content-Type': 'application/json'
	}
};