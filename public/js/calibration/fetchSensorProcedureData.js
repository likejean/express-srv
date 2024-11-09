const _store = new dataStorage();   //store all sensors and procedures data

const fetchSensorProcedureData = async () => {
  // fetch all data using POST API endpoints: sensors, procedures
	await Promise.all([axios.get("/api/sensors"), axios.get("/api/procedures")])
		.then((result) => {

		//store all data in local data storage
		result.forEach((elem) => {
			let name = elem.data.collectionName;
			_store[name] = elem;
		});

		generateSensorProcedureNameLists(_store.getSensorNames(), _store.getCalProcedureNames());

		})
		.catch((error) => {
		//display error message if data fetch failure occurs or any other internal error detected
		console.log(error);
    });
};

fetchSensorProcedureData();
