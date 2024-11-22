function patchUserAccountInfo() {
    let userInfoPatchRequestData = {};

	//obtain query string by id
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");


  //get this helper function from utils...
    userInfoPatchRequestData = filterObjectAndTransform(_userfactory.inputWrappers, (item) => item.status === true); 
	
	

    //use PATCH API endpoint to update existing sensor record
    axios.patch(`../api/users/${id}`, userInfoPatchRequestData)
    .then((response) => {
        icons.forEach((icon) => {
            icon.removeEventListener("click", editUserAccountInfoClickEventCallback);
        });
        window.location.reload();
        console.log("User record updated successfully:", response);              
    })
    .catch((error) => {
        console.log("ERROR", error);
    });
  
}