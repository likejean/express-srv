function patchCalibrationRecord() {
    calPatchRequestData = {};

	//obtain query string by id
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");


  //get this helper function from utils...
    calPatchRequestData = filterObjectAndTransform(_calfactory.inputWrappers, (item) => item.status === true);

    if (_calfactory.inputWrappers.lastCalDateWrapper.status) {
        // If the last-date field is being patched, include the updated calibrationName too.
        const derivedCalibrationName = deriveCalibrationNameFromDate(_calfactory.inputWrappers.lastCalDateWrapper.value);
        if (derivedCalibrationName) {
            calPatchRequestData.calibrationName = derivedCalibrationName;
        }
    }

  //use PATCH API endpoint to update existing calibration record
    axios
    .patch(`../api/calibrations/${id}`, calPatchRequestData,
        { headers: getRequestHeaders() }
    )
    .then((response) => {
        icons.forEach((icon) => {
            icon.removeEventListener("click", editCalibrationIconClickEventCallback);
        });
        window.location.reload();
        console.log("Calibration record updated successfully:", response);              
    })
    .catch((error) => {
        console.log("ERROR", error);
    });
}
