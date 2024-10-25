function patchCalibrationRecord() {
  calPatchRequestData = {};

  //get this helper function from utils...
  calPatchRequestData = filterObjectAndTransform(
    calibrationInputContainer,
    (item) => item.status === true
  );

  
  //use PATCH API endpoint to update existing calibration record
  axios
    .patch(`../api/calibrations/${id}`, calPatchRequestData)
    .then((response) => {
      icons.forEach((icon) => {
        icon.removeEventListener("click", iconClickEventCallback);
      });
      window.location.reload();      
    })
    .catch((error) => {
      console.log("ERROR", error);
    });
}
