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

const fetchCalRecordById = async () => {
    //obtain query string by id
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");

	
  	//Get a current time in unix format
    const unixTimestamp = moment().unix();

 	 // fetch all data using POST API endpoints: sensors, calibrations, procedures
    await axios
    .get(`../api/calibrations/${id}`)
    .then((result) => {
        //highlight calibration due date with red font color if expired...
        let unixCalibrationDueDate = moment
            .utc(result.data.calibration.dueCalibrationDate)
            .unix();
        if (unixCalibrationDueDate < unixTimestamp)
            dueCalibrationDate.style.color = "red";

        _calfactory.sensor = result.data.calibration.sensorId;
        _calfactory.procedure = result.data.calibration.procedureId;
        _calfactory.calibrationName = result.data.calibration.calibrationName;

        //populate fetched calibration data in Calibration Summary Card html elements
        calibrationName.innerText = result.data.calibration.calibrationName;
        lastCalibrationDate.innerText = moment
            .utc(result.data.calibration.lastCalibrationDate)
            .format("dddd, MM/DD/YYYY");
        dueCalibrationDate.innerText = moment
            .utc(result.data.calibration.dueCalibrationDate)
            .format("dddd, MM/DD/YYYY");
        calibrationExtended.innerText = result.data.calibration
            .calibrationExtended
            ? "Yes"
            : "No";
        maxCalibrationExtention.innerText =
            result.data.calibration.maxCalibrationExtension;
        calibrationRangePercent.innerText =
            result.data.calibration.calibrationRangePercent;
        calibrationAdjustmentMade.innerText = result.data.calibration
            .adjustmentsMade
            ? "Yes"
            : "No";
        calComment.innerText = result.data.calibration.comment;

        sensorName.innerText = "\u00a0" + result.data.calibration.sensorId.EID;
        procedureName.innerText =
            "\u00a0" + result.data.calibration.procedureId.procedureName;
    })
    .catch((error) => {
        //display error message if data fetch failure occurs or any other internal error detected
        console.log(error);
    });
};

fetchCalRecordById();
