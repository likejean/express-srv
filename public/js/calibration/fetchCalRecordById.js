const sensorName = document.getElementById("sensor-name");
const procedureName = document.getElementById("procedure-name");
const calibrationName = document.getElementById("calName");
const lastCalibrationDate = document.getElementById("lastCalDate");
const dueCalibrationDate = document.getElementById("dueCalDate");
const calibrationExtended = document.getElementById("calExtended");
const maxCalibrationExtention = document.getElementById("maxCalExtention");
const calibrationRangePercent = document.getElementById("calRangePercent");
const calibrationAdjustmentMade = document.getElementById("calAdjustmentMade");
const calComment = document.getElementById("calComment");

//obtain query string by id
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

//this function fetches the calibration record by its id and populates the html elements with the data
//it also fetches the sensor and procedure data by their ids and populates the html elements with the data
const fetchCalRecordById = async () => {
	
  	//Get a current time in unix format
    const unixTimestamp = moment().unix();

 	 // fetch all data using POST API endpoints: sensors, calibrations, procedures
    await axios
    .get(`../api/calibrations/${id}`)
    .then((result) => {
        //highlight calibration due date with red font color if expired...
        let unixCalibrationDueDate = moment.utc(result.data.calibration.dueCalibrationDate).unix();
        if (unixCalibrationDueDate < unixTimestamp) dueCalibrationDate.style.color = "red"
		else {
			if (result.data.calibration.calibrationExtended) dueCalibrationDate.style.color = "orange"
			else dueCalibrationDate.style.color = "green"
		}

		//store sensor and procedure ids and calibration name in the _calfactory object
        _calfactory.sensor = result.data.calibration.sensorId;
        _calfactory.procedure = result.data.calibration.procedureId;
        _calfactory.calibrationName = result.data.calibration.calibrationName;

        //populate html elements with data
        calibrationName.innerText = result.data.calibration.calibrationName;
        lastCalibrationDate.innerText = moment.utc(result.data.calibration.lastCalibrationDate).format("dddd, MM/DD/YYYY");
        dueCalibrationDate.innerText = moment.utc(result.data.calibration.dueCalibrationDate).format("dddd, MM/DD/YYYY");
        calibrationExtended.innerText = result.data.calibration.calibrationExtended ? "Yes" : "No";
        maxCalibrationExtention.innerText = result.data.calibration.maxCalibrationExtension;
        calibrationRangePercent.innerText = result.data.calibration.calibrationRangePercent;
        calibrationAdjustmentMade.innerText = result.data.calibration.adjustmentsMade ? "Yes" : "No";
        calComment.innerText = result.data.calibration.comment;
        sensorName.innerText = "\u00a0" + result.data.calibration.sensorId.EID;
        procedureName.innerText = "\u00a0" + result.data.calibration.procedureId.procedureName;
    })
    .catch((error) => {
        //display error message if data fetch failure occurs or any other internal error detected
        console.log(error);
    });
};

fetchCalRecordById();
