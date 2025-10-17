const calibrationComment = document.querySelector(".procedure-comment");
const procedureDescription = document.getElementById("procedure-description");
const calibratorModel = document.getElementById("calibrator-model");
const calibratorManufacturer = document.getElementById("calibrator-manufacturer");
const procedureName = document.getElementById("procedure-name");

//function to fetch article record by id
//id is obtained from query string
const fetchArticleRecordById = async () => {

    //obtain query string by id
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");

	//fetch procedure record by id
	//populate html elements with fetched data
	//axios get request to fetch procedure record by id
	await axios
	.get(`../api/procedures/${id}`)
	.then((result) => {	
		console.log("Fetched procedure record:", result);
		
		//populate html elements with data
		//populate fetched procedure data in Procedure Description Card html elements
		procedureDescription.innerText = result.data.sensor.description;
		calibrationComment.innerText = result.data.sensor.comment;
		calibratorModel.innerText = result.data.sensor.calibratorModel;
		calibratorManufacturer.innerText = result.data.sensor.manufacturer;
		procedureName.innerText = result.data.sensor.procedureName;
		
	}).catch((error) => {
		//display error message if data fetch failure occurs or any other internal error detected
		console.log(error);
	});
}

//call fetchArticleRecordById function on page load
fetchArticleRecordById();

