function patchUserAccountInfo() {
    let userInfoPatchRequestData = {};

	//obtain query string by id
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");


  //get this helper function from utils...
  userInfoPatchRequestData = filterObjectAndTransform(_userfactory.inputWrappers, (item) => item.status === true); 
	
	console.log(userInfoPatchRequestData, id);
  
}