const getRequestHeaders = () => {
	const token = localStorage.getItem('token');
	return {
		Authorization: 'Bearer ' + token || '',
		'Content-Type': 'application/json'
	}
};