function patchSensorRecord() {
    sensorPatchRequestData = {};

	//obtain query string by id
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");


  //get this helper function from utils...
    sensorPatchRequestData = filterObjectAndTransform(_sensfactory.inputWrappers, (item) => item.status === true); 
	
	console.log(sensorPatchRequestData);
  
  //use PATCH API endpoint to update existing sensor record
    axios.patch(`../api/sensors/${id}`, sensorPatchRequestData)
    .then((response) => {
        icons.forEach((icon) => {
            icon.removeEventListener("click", editSensorIconClickEventCallback);
        });
        window.location.reload();
        console.log("Sensor record updated successfully:", response);              
    })
    .catch((error) => {
        console.log("ERROR", error);
    });
}
