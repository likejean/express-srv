function createSensorDatasetsChart(datasets) {

	console.log(datasets)
	const sensorChartWrapper = document.getElementById('sensor-chart-wrapper');

	const ctx = document.createElement('canvas');

	
	new Chart(
		ctx.getContext('2d'),
		getSensorDatasetsChartConfig(generateSensorDatasetsChartData())
	);


	sensorChartWrapper.appendChild(ctx);

}
