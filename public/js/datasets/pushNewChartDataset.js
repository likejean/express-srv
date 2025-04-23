function pushNewChartDataset() {

	const chartId = _chartfactory.chart._id;

	newDatasetPostData["seriesDescription"] = _chartfactory.newDatasetFormInputs.seriesDescription.value;
	newDatasetPostData["seriesLabel"] = _chartfactory.newDatasetFormInputs.seriesLabel.value;;
	newDatasetPostData["calibrationId"] = _chartfactory.calibrations.find(calibration => calibration.calibrationName === newDatasetPostData.calibrationName)._id;
	const idx = _chartfactory.chart.sensorDatasets[_chartfactory.chart.sensorDatasets.length - 1].plotId;	
	newDatasetPostData["plotId"] = `Plot${Number(idx[idx.length - 1]) + 1}`;
	newDatasetPostData["dataset"] = _chartfactory.currentSensorErrorLineDataset;

	//user input keys that must be cleaned out
	const keysToRemove = ["sensorError", "calibratorOutput"];
	
	// Delete the keys from the newDatasetPostData object
	for (const key of keysToRemove) {
		if (key in newDatasetPostData) {
			delete newDatasetPostData[key];
		}
	}
	
	//axios post request to push a new dataset to the server
	axios
		.patch(`../api/datasets/push/${chartId}`, newDatasetPostData)
		.then((response) => {
			console.log("New chart dataset record added successfully:", response);
			window.location.reload();
			
		})
		.catch((error) => {
			console.log("ERROR:", error);
		});

}
	