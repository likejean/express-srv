const fetchAllSensorInfoById = async () => {

	//obtain query string by id
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	var id = urlParams.get("id");

  	// fetch all data using POST API endpoints: sensors, calibrations, procedures
    await axios
		.get(`../api/sensors/${id}`)
		.then((result) => {
			console.log(result);
		})
		.catch((error) => {
			//display error message if data fetch failure occurs or any other internal error detected
			console.log(error);
		});
};

fetchAllSensorInfoById();