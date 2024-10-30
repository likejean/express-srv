function createNewSensorRecord() {
  //use PATCH API endpoint to update existing calibration record
  axios
    .post(`../api/sensors`, newSensorPostData)
    .then((response) => {
      console.log("New sensor created successfully:", response);
      form.removeEventListener("submit", submitNewSensorData);
      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.log("ERROR:", error);
    });
}
