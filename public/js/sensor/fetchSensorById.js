const sensorName = document.getElementById("sensor-name");
const sensorModel = document.getElementById("sensor-model");
const sensorComment = document.getElementById("sensorComment");
const sensorDescription = document.getElementById("sensorDescription");


const fetchSensordById = async () => {

	//obtain query string by id
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	var id = urlParams.get("id");

  	// fetch all data using POST API endpoints: sensors, calibrations, procedures
    await axios
		.get(`../api/sensors/${id}`)
		.then((result) => {
			console.log(result);
			sensorName.innerText = "\u00a0" + result.data.sensor.EID;
			sensorModel.innerText = "\u00a0" + result.data.sensor.model;
			sensorDescription.innerText = result.data.sensor.description;
			sensorComment.innerText = result.data.sensor.comment;
		})
		.catch((error) => {
			//display error message if data fetch failure occurs or any other internal error detected
			console.log(error);
		});
};

fetchSensordById();