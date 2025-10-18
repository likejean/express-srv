const calibrationComment = document.querySelector(".procedure-comment");
const procedureDescription = document.getElementById("procedure-description");
const calibratorModel = document.getElementById("calibrator-model");
const calibratorManufacturer = document.getElementById("calibrator-manufacturer");
const procedureName = document.getElementById("procedure-name");

//data storage object to hold all fetched calibration procedure articles data
const _store = new dataStorage();   

//function to fetch article record by id
//id is obtained from query string
const fetchArticlesByProcedureId = async () => {

    //obtain query string by id
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");


	await Promise.all([axios.get(`../api/procedures/${id}`, {
			headers: getRequestHeaders()
		}), axios.get("/api/articles", {
			headers: getRequestHeaders()
		})])
		.then((result) => {

		//store all fetched data in local data storage
		_store.activeProcedure = result[0].data.procedure;
		_store.articles = result[1].data;

		//populate html elements with data
			//populate fetched procedure data in Procedure Description Card html elements
			procedureDescription.innerText = _store.activeProcedure.description;
			calibrationComment.innerText =  _store.activeProcedure.comment;
			calibratorModel.innerText = _store.activeProcedure.calibratorModel;
			calibratorManufacturer.innerText = _store.activeProcedure.manufacturer;
			procedureName.innerText = _store.activeProcedure.procedureName;


		})
		.catch((error) => {
			//display error message if data fetch failure occurs or any other internal error detected
			console.log(error);
    });


}

//call fetchArticleRecordById function on page load
fetchArticlesByProcedureId();


