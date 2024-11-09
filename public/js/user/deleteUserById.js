function openUserWarningModal (id) {
    const modalTitle = document.querySelector('.delete-user-record-email');
	_store.selectedTableRowUserId = id;
    modalTitle.innerText = "User email: " + _store.users.data.payload.find(item => item._id === id).email;
}


function deleteUserRecord() {
	const userId = _store.selectedTableRowUserId;
    axios
        .delete(`../api/users/${userId}`)
        .then((response) => {
            console.log("User record deleted successfully:", response.data);
            window.location.reload();
        })
        .catch((error) => {
        console.error("Error deleting user document:", error);
    });
}