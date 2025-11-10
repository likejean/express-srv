//data storage object to hold all fetched calibration procedure calibrations data
const _store = new dataStorage();   

//function to fetch all calibrations
const fetchAllCalibrations = async () => {

	// fetch all data using POST API endpoints: calibrations
	await axios.get("/api/calibrations", {
			headers: getRequestHeaders()
		})
		.then((result) => {
			_store.calibrations = result.data.payload;
			createCalibrationTable(_store.calibrations);
		})
		.then(() => {			
		})
		.catch((error) => {
			//display error message if data fetch failure occurs or any other internal error detected
			console.log(error);
		}
	);
}

//call fetchAllCalibrations.js function
fetchAllCalibrations();