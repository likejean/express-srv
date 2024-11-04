const _store = new dataStorage();

const fetchAllCalProcedureData = async () => {
  // fetch all calibration procedure data using POST API endpoints: procedures
	await axios.get("/api/procedures")
		.then((result) => {

		//store all data in local data storage		
		_store["procedures"] = result;			
		createProceduresTable();  //function invocation;

		})
		.catch((error) => {
		//display error message if data fetch failure occurs or any other internal error detected
		console.log(error);
    });
};

fetchAllCalProcedureData();