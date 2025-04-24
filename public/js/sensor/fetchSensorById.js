const sensorName = document.getElementById("sensor-name");
const sensorModel = document.getElementById("sensor-model");
const sensorComment = document.getElementById("sensorComment");
const sensorCapacity = document.getElementById("sensorCapacity");
const sensorLocation = document.getElementById("sensorLocation");
const sensorCalibrationPriority = document.getElementById("calibrationPriority");
const sensorDescription = document.getElementById("sensorDescription");

//this function fetches all sensor information by ID
//it also fetches the sensor and procedure data by their ids and populates the html elements with the data
const fetchSensordById = async () => {

	//obtain query string by id
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	var id = urlParams.get("id");

  	// fetch all data using POST API endpoints: sensors
    await axios
		.get(`../api/sensors/${id}`)
		.then((result) => {
			sensorName.innerText = "\u00a0" + result.data.sensor.EID + "\u00a0-\u00a0{" + result.data.sensor.capacityRange + "}";
			sensorModel.innerText = "\u00a0" + result.data.sensor.model;
			sensorCapacity.innerText = result.data.sensor.capacityRange;
			sensorDescription.innerText = result.data.sensor.description;
			sensorCalibrationPriority.innerText = result.data.sensor.calibrationPriority;
			sensorComment.innerText = result.data.sensor.comment;
			sensorLocation.innerText = result.data.sensor.location;
		})
		.catch((error) => {
			//display error message if data fetch failure occurs or any other internal error detected
			console.log(error);
		});
};

//function call for fetching sensor data by id
//this function is called when the page is loaded
fetchSensordById();