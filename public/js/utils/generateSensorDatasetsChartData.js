//This functions prepares a list of all datasets for Sensor CHART
function generateSensorDatasetsChartData(sensorData) {

	let datasets = [];

	//Generate a Line Plot for LOWER Error Limit
	datasets.push({
		...chartFormats.LOWER_ERROR_LIMIT,
		label: "Lower Error Limit",
		data: sensorData.errorLowerLimit
	});
		
	//Generate a Line Plot for UPPER Error Limit
	datasets.push({
		...chartFormats.UPPER_ERROR_LIMIT,
		label: "Upper Error Limit",
		data: sensorData.errorUpperLimit
	});

	//This function recieves "sensorErrorData" as an array, which should contians usually a single element ONLY (means a single CHART per a sensor)... 
	//but this configuration might be simplify later....
	for (var i = 0; i < sensorData.sensorDatasets.length; i++){

		//Generate Line Plot(s) for Sendor ABSOLUTE Error Outputs (could be more than one plot, for current, previous, 
		//ascending or decending order data)
		datasets.push({
			borderColor: chartFormats.ABSOLUTE_ERROR_OUTPUT.borderColor[i],
			label: `${sensorData.sensorDatasets[i].seriesLabel}`,
			tension: chartFormats.ABSOLUTE_ERROR_OUTPUT.tension,
			data: sensorData.sensorDatasets[i].dataset
		});
		
	}

	return { datasets };
}