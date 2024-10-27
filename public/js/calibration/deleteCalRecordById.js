

function openCalibrationWarningModal () {
    const modalTitle = document.querySelector('.delete-calibration-record-name');
    modalTitle.innerText = "\u00a0\u00a0\u00a0" + calibrationInputContainer.calibrationName;
}


function deleteCalibrationRecord() {
    const data = {
        sensorId: calibrationInputContainer.sensor._id,
        procedureId: calibrationInputContainer.procedure._id,
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
