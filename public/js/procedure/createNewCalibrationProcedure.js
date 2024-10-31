function createNewCalibrationProcedure() {
  //use POST API endpoint to create new calibration procedure
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
