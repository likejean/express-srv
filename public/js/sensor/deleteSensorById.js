function openSensorWarningModal () {
    const modalTitle = document.querySelector('.delete-sensor-modal-header');
    modalTitle.innerText = _store.activeSensorCard.description + " " + _store.activeSensorCard.EID;
}


function deleteSensorRecord() {   
	const id = _store.activeSensorCard.sensorId;	
    axios
        .delete(`../api/sensors/${id}`)
        .then((response) => {
            console.log("Sensor record deleted successfully:", response.data);
            window.location.href = "../index.html";
        })
        .catch((error) => {
        console.error("Error deleting sensor document:", error);
    });
}
