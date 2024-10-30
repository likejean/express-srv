function createNewCalibrationProcedure() {
  //use PATCH API endpoint to update existing calibration record
  console.log("create new procedure....", newProcedurePostData);
  axios
    .post(`../api/procedures`, newProcedurePostData)
    .then((response) => {
      console.log("New calibration procedure created successfully:", response);
      form.removeEventListener("submit", submitNewProcedureData);
      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.log("ERROR:", error);
    });
}
