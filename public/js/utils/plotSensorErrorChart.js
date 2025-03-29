function createSensorDatasetsChart(datasets) {

	const sensorChartWrapper = document.getElementById('sensor-chart-wrapper');
	let i = 1;

	for (const chart of datasets) {		

		const ctx = document.createElement('canvas');
		const deleteChartButton = document.createElement('button');
		deleteChartButton.innerText = "Delete";
		deleteChartButton.classList.add("btn", "btn-danger", "my-2");
		deleteChartButton.id = `chart-${i}`;
		
		deleteChartButton.onclick = function() {
			deleteDatasetRecord(chart._id);
		};
		
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

		appendChildElementToParent(sensorChartWrapper, ctx);
		appendChildElementToParent(sensorChartWrapper, deleteChartButton);

		i++;
	
	}
}
