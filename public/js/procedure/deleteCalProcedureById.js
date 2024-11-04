function deleteCalibrationProcedure(id) {
    console.log("delete", id)

    axios
        .delete(`../api/procedures/${id}`)
        .then((response) => {
            console.log("Procedure record deleted successfully:", response.data);
            window.location.reload();
        })
        .catch((error) => {
        console.error("Error deleting document:", error);
    });
}