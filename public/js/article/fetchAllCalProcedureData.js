//data storage object to hold all fetched calibration procedure articles data
const _store = new dataStorage();   

const fetchAllCalProcedureData = async () => {
  // fetch all calibration procedures using POST API endpoints: /procedures
	await axios.get("/api/procedures", {
			headers: getRequestHeaders()
		})
		.then((result) => {

		//store all data in local data storage		
		_store["procedures"] = result;	

		})
		.catch((error) => {
		//display error message if data fetch failure occurs or any other internal error detected
		console.log(error);
    });
};
