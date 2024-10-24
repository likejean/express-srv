function patchCalibrationRecord() {
  calPatchRequestData = {};

  //get this helper function from utils...
  calPatchRequestData = filterObjectAndTransform(
    calibrationInputContainer,
    (item) => item.status === true
  );

  //obtain query string by id
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let id = urlParams.get("id");

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
