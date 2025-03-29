function createSensorDatasetsChart(datasets) {

	const sensorChartWrapper = document.getElementById('sensor-chart-wrapper');

	const ctx = document.createElement('canvas');
	

	for (const chart of datasets) {

		
		let sensorData = {
			sensorDatasets: chart.sensorDatasets,
			errorUpperLimit: chart.errorUpperLimit,
			errorLowerLimit: chart.errorLowerLimit
		};

		let options = {
			chartTitle: chart.chartTitle,
			chartXLabel: chart.chartXLabel,
			chartYLabel: chart.chartYLabel,
		};
		
		new Chart(
			ctx.getContext('2d'),
			getSensorDatasetsChartConfig(generateSensorDatasetsChartData(sensorData), options)
		);
		sensorChartWrapper.appendChild(ctx);
	}
}
