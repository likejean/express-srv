function openDatasetWarningModal () {
    const modalTitle = document.querySelector('.delete-dataset-record-name');
    modalTitle.innerText = `${_store.activeSensorCard.description}: ${_store.activeSensorCard.EID}`;
}

//this function is called when the user clicks the "Delete Dataset" button on the dataset details card
//it sends a DELETE request to the server with the dataset ID and sensor information to delete the dataset record from the database
function deleteDatasetRecord() {

	// Get dataset ID and sensor information from the store
	const id = _store.activeDatasetChart._id;

	// Prepare data to send in the DELETE request body
    const data = {
        sensorEID: _store.activeSensorCard.EID,
        sensorDescription:  _store.activeSensorCard.description
    };
	//
	modal.hide();
    
	// Send DELETE request to the server with dataset ID and sensor information
	// The server will use this information to identify and delete the correct dataset record from the database
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
