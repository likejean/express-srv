function patchCalibrationRecord() {
    calPatchRequestData = {};

	//obtain query string by id
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");


  //get this helper function from utils...
    calPatchRequestData = filterObjectAndTransform(_calfactory.inputWrappers, (item) => item.status === true);    
  
  //use PATCH API endpoint to update existing calibration record
    axios
    .patch(`../api/calibrations/${id}`, calPatchRequestData)
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
