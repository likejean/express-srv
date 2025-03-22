const _store = new dataStorage();   //store all information for active/selected sensor card

// This Axios request fetches all sensor information by ID
const fetchAllSensorInfoById = async () => {

	//obtain query string by id
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	var id = urlParams.get("id");

  	// fetch all data using POST API endpoints: sensors, calibrations, procedures
    await axios
		.get(`../api/sensors/${id}`)
		.then((result) => {
			_store.activeSensorCard = result.data.sensor
			console.log('_store', _store);
		})
		.catch((error) => {
			//display error message if data fetch failure occurs or any other internal error detected
			console.log(error);
		});
};

fetchAllSensorInfoById();