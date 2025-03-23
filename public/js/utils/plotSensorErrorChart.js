function createSensorDatasetsChart(datasets, options) {

	const sensorChartWrapper = document.getElementById('sensor-chart-wrapper');

	const ctx = document.createElement('canvas');

	
	new Chart(
		ctx.getContext('2d'),
		getSensorDatasetsChartConfig(generateSensorDatasetsChartData(datasets), options)
	);


	sensorChartWrapper.appendChild(ctx);

}
