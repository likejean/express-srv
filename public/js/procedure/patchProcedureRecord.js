function patchProcedureRecord() {
    procedureCalibratorPatchRequestData = {};

	//obtain query string by id
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");


  //get this helper function from utils...
    procedureCalibratorPatchRequestData = filterObjectAndTransform(_procfactory.inputWrappers, (item) => item.status === true);    

  //use PATCH API endpoint to update existing Calibration procedure for current calibrator record
    axios
		.patch(`../api/procedures/${id}`, procedureCalibratorPatchRequestData, 
			{ headers: getRequestHeaders() }
		)
		
		.then((response) => {
			icons.forEach((icon) => {
				icon.removeEventListener("click", editCalibratorIconClickEventCallback);
			});
			window.location.reload();
			console.log("Calibration procedure for current calibrator updated successfully:", response);              
		})
		.catch((error) => {
			console.log("ERROR", error);
		});
}
