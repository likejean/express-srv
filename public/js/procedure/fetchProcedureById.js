//data storage object to hold all fetched calibration procedure articles data
const _store = new dataStorage();   

//this function fetches a single calibration procedure by ID
const fetchProcedureById = async () => {

  	// fetch all data using POST API endpoints: sensors
    await axios
		.get(`../api/procedures/${procedureId}`, { headers: getRequestHeaders() })
		.then((result) => {
			_store.activeProcedure = result.data.procedure;
			document.querySelector(".procedure-name").innerText = "Procedure Name: " + _store.activeProcedure.procedureName;
		})
		.catch((error) => {
			//display error message if data fetch failure occurs or any other internal error detected
			console.log(error);
		});
};

//function call for fetching calibration procedure data by id
//this function is called when the page is loaded
fetchProcedureById();