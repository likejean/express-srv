function createNewCalibrationRecord() {
//use POST API endpoint to create new calibration record

//axios post request to push a new calibration to the server
axios
    .post(`../api/calibrations`, newCalibrationPostData)
    .then((response) => {
        console.log("New calibration record created successfully:", response);
        form.removeEventListener("submit", submitNewCalibrationData);
        window.location.href = "../index.html";
    })
    .catch((error) => {
        console.log("ERROR:", error);
    });
}
    