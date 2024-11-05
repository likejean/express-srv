function openCalibrationWarningModal (id) {
    const modalTitle = document.querySelector('.delete-calibration-procedure-name');
	_store.selectedTableRowProcedureId = id;
    modalTitle.innerText = "Procedure Name: " + _store.procedures.data.payload.find(item => item._id === id).procedureName;
}


function deleteCalibrationProcedure() {
	const procedureId = _store.selectedTableRowProcedureId;
    axios
        .delete(`../api/procedures/${procedureId}`)
        .then((response) => {
            console.log("Procedure record deleted successfully:", response.data);
            window.location.reload();
        })
        .catch((error) => {
        console.error("Error deleting document:", error);
    });
}