//this function opens the modal when the user clicks the delete button in the calibration record page
function openCalWarningModal () {
    const modalTitle = document.querySelector('.delete-calibration-record-name');
    modalTitle.innerText = _calfactory.calibrationName;
}

//this function is called when the user clicks the delete button in the modal
function deleteCalibrationRecord() {
    const data = {
        sensorId: _calfactory.sensor._id,
        procedureId: _calfactory.procedure._id,
    };
    
	//axios delete request to delete the calibration record from the server	
    axios
        .delete(`../api/calibrations/${id}`, { data }, 
            { headers: getRequestHeaders() }
        )
        .then((response) => {
            console.log("Calibration record deleted successfully:", response.data);
            window.location.href = "../index.html";
        })
        .catch((error) => {
        console.error("Error deleting document:", error);
    });
}
