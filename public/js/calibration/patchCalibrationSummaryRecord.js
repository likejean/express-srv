function patchCalibrationSummaryRecord() {
  
  //obtain query string by id
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let id = urlParams.get("id");

  axios
    .patch(`../api/calibrations/${id}`, calPatchRequestData)
    .then((response) => {
      console.log(response);
      window.location.reload();
      //ditch all event listeners from icon elements
      icons.forEach((icon) => {
        icon.removeEventListener("click", handleIconClick);
      });
    })
    .catch((error) => {
      console.log("ERROR", error);
    });
}
