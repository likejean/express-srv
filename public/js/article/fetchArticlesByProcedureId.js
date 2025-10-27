//get html elements to populate procedure data
const calibratorDescription = document.getElementById("calibratorDescription");
const calibratorModel = document.getElementById("calibratorModel");
const calibratorManufacturer = document.getElementById("calibratorManufacturer");
const procedureName = document.getElementById("procedureName");
const procedureComment = document.getElementById("procedureComment");

//data storage object to hold all fetched calibration procedure articles data
const _store = new dataStorage();   

//obtain query string by id
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

//function to fetch article record by id
//id is obtained from query string
const fetchArticlesByProcedureId = async () => {

	// fetch all data using POST API endpoints: procedures, articles
	await Promise.all([axios.get(`../api/procedures/${id}`, {
			headers: getRequestHeaders()
		}), axios.get(`../api/articles/${id}`, {
			headers: getRequestHeaders()
		})])
		.then((result) => {

		//store all fetched data in local data storage
		_store.activeProcedure = result[0].data.procedure;
		_store.articles = result[1].data.articles;
	
		renderAllArticles(_store.articles);

		//populate html elements with data
			//populate fetched procedure data in Procedure Description Card html elements
			calibratorDescription.innerText = _store.activeProcedure.description;			
			calibratorModel.innerText = _store.activeProcedure.calibratorModel;
			calibratorManufacturer.innerText = _store.activeProcedure.manufacturer;
			procedureName.innerText = _store.activeProcedure.procedureName;
			procedureComment.innerText =  _store.activeProcedure.comment;
		})
		.catch((error) => {
			//display error message if data fetch failure occurs or any other internal error detected
			console.log(error);
    });
}

//call fetchArticleRecordById function on page load
fetchArticlesByProcedureId();


