function deleteCalibrationRecord() {
  const data = {
    sensorId: calibrationInputContainer.sensor._id,
    procedureId: calibrationInputContainer.procedure._id,
  };
  axios
    .delete(`../api/calibrations/${id}`, { data })
    .then((response) => {
      console.log("Document deleted successfully:", response.data);
      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.error("Error deleting document:", error);
    });
}
