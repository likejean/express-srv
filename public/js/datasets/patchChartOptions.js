function patchChartOptionsRecord() {
    calPatchRequestData = {};

	//obtain query string by id
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");


  //get this helper function from utils...
    chartOptionsPatchRequestData = filterObjectAndTransform(_chartfactory.inputWrappers, (item) => item.status === true);    

  //use PATCH API endpoint to update option in existing chart record
    axios
    .patch(`../api/datasets/${id}`, chartOptionsPatchRequestData)
    .then((response) => {
        icons.forEach((icon) => {
            icon.removeEventListener("click", editChartIconClickEventCallback);
        });
        window.location.reload();
        console.log("Chart updated successfully:", response);              
    })
    .catch((error) => {
        console.log("ERROR", error);
    });
}
