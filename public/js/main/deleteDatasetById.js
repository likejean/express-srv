// function openDatasetWarningModal () {
//     const modalTitle = document.querySelector('.delete-calibration-record-name');
//     modalTitle.innerText = _calfactory.calibrationName;
// }


function deleteDatasetRecord(id) {
    const data = {
        sensorEID: _store.activeSensorCard.EID,
        sensorDescription:  _store.activeSensorCard.description
    };

	console.log(data, _store)
    
    axios
        .delete(`../api/datasets/${id}`, { data })
        .then((response) => {
            console.log("Dataset record deleted successfully:", response.data);
            window.location.href = "../index.html";
        })
        .catch((error) => {
        console.error("Error deleting document:", error);
    });
}
