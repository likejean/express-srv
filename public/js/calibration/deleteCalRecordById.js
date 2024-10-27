

function openCalibrationWarningModal () {
    const modalTitle = document.querySelector('.delete-calibration-record-name');
    modalTitle.innerText = "\u00a0\u00a0\u00a0" + _calfactory.calibrationName;
}


function deleteCalibrationRecord() {
    const data = {
        sensorId: _calfactory.sensor._id,
        procedureId: _calfactory.procedure._id,
    };
    
    axios
        .delete(`../api/calibrations/${id}`, { data })
        .then((response) => {
            console.log("Calibration record deleted successfully:", response.data);
            window.location.href = "../index.html";
        })
        .catch((error) => {
        console.error("Error deleting document:", error);
    });
}
