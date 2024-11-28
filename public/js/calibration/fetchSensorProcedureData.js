const _store = new dataStorage();   //store all sensors and procedures data

const fetchSensorProcedureData = async () => {
  // fetch all data using POST API endpoints: sensors, procedures
	await Promise.all([axios.get("/api/sensors", {
			headers: getRequestHeaders()
		}), axios.get("/api/procedures", {
			headers: getRequestHeaders()
		})])
		.then((result) => {

		//store all data in local data storage
		result.forEach((elem) => {
			let name = elem.data.collectionName;
			_store[name] = elem;
		});

		generateSensorProcedureNameLists(_store.getSensorEIDs(), _store.getCalProcedureNames());

		})
		.catch((error) => {
		//display error message if data fetch failure occurs or any other internal error detected
		console.error(error.response);
			
		const userLoginErrorTextContent = error.response.data.message;

		const modal = document.getElementById('new-cal-record-auth-error-modal');
		const span = document.getElementById('error-text-content');

		new bootstrap.Modal(modal).show();
		span.innerText = userLoginErrorTextContent;
    });
};

fetchSensorProcedureData();
