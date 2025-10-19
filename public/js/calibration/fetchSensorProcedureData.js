const _store = new dataStorage();   //store all sensors and procedures data

//this function generates the sensor EID and procedure name lists for the dropdown menu in the calibration record page
const fetchSensorProcedureData = async () => {
	//this Promise.all() method is used to fetch all data from the server using GET API endpoints: sensors, procedures
	//it returns an array of results, which are then stored in the _store object
	await Promise.all([axios.get("/api/sensors", {
			headers: getRequestHeaders()
		}), axios.get("/api/procedures", {
			headers: getRequestHeaders()
		})])
		.then((result) => {

		console.log(result);

		//store all data in local data storage
		result.forEach((elem) => {
			let name = elem.data.collectionName;
			_store[name] = elem;
		});

		//store all data in local data storage
		generateSensorProcedureNameLists(_store.getSensorEIDs(), _store.getCalProcedureNames());

		})
		.catch((error) => {
		//display error message if data fetch failure occurs or any other internal error detected
		console.error(error.response);
			
		const userLoginErrorTextContent = error.response.data.message;

		const modal = document.getElementById('new-cal-record-auth-error-modal') || document.getElementById('new-article-auth-error-modal');
		const span = document.getElementById('error-text-content');

		new bootstrap.Modal(modal).show();
		span.innerText = userLoginErrorTextContent;
    });
};

fetchSensorProcedureData();
