//This functions prepares a list of all datasets for Sensor CHART
function generateSensorDatasetsChartData(sensorErrorData) {

	let datasets = [];

	//This function recieves "sensorErrorData" as an array, which should contians usually a single element ONLY (means a single CHART per a sensor)... 
	//but this configuration might be simplify later....
	for (var i = 0; i < sensorErrorData.length; i++){

		//Generate a Line Plot for LOWER Error Limit
		datasets.push({
			...chartFormats.LOWER_ERROR_LIMIT,
			label: "Lower Error Limit",
			data: generateChartLine(sensorErrorData[i].calibratorDataset, sensorErrorData[i].errorLowerLimit)
		});
			
		//Generate a Line Plot for UPPER Error Limit
		datasets.push({
			...chartFormats.UPPER_ERROR_LIMIT,
			label: "Upper Error Limit",
			data: generateChartLine(sensorErrorData[i].calibratorDataset, sensorErrorData[i].errorUpperLimit)
		});

		//Generate Line Plot(s) for Sendor ABSOLUTE Error Outputs (could be more than one plot, for current, previous, 
		//ascending or decending order data)
		for (var j = 0; j < sensorErrorData[i].sensorDatasets.length; j++){
			
			datasets.push({
				label: `${sensorErrorData[i].sensorDatasets[j].seriesLabel} - ${sensorErrorData[i].sensorDatasets[j].seriesDescription}`,
				borderColor: chartFormats.ABSOLUTE_ERROR_OUTPUT.borderColor[j],
				tension: chartFormats.ABSOLUTE_ERROR_OUTPUT.tension,
				data: generateChartLine(sensorErrorData[i].calibratorDataset, sensorErrorData[i].sensorDatasets[j].dataset)
			});
		}
	}

	return { datasets };
}