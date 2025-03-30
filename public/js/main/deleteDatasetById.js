function openDatasetWarningModal () {
    const modalTitle = document.querySelector('.delete-dataset-record-name');
    modalTitle.innerText = `${_store.activeSensorCard.description}: ${_store.activeSensorCard.EID}`;
}

function deleteDatasetRecord() {
	const id = _store.activeDatasetChart._id;
    const data = {
        sensorEID: _store.activeSensorCard.EID,
        sensorDescription:  _store.activeSensorCard.description
    };
	modal.hide();
    
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
