function deleteCalibrationRecord() {
    console.log(id)

    const data = {
        sensorId: calibrationInputContainer.sensor._id,
        procedureId: calibrationInputContainer.procedure._id 
      };
    axios.delete(`../api/calibrations/${id}`)
    .then(response => {
        console.log('Document deleted successfully:', response.data);
    })
    .catch(error => {
        console.error('Error deleting document:', error);
    });
}