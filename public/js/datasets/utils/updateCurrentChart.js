function updateChartLabelUnits (xLabel, yLabel, units) {
	previewChart.options.scales.x.title.text = `${xLabel}, [${units !== undefined ? units : ''}]`;
	previewChart.options.scales.y.title.text = `${yLabel}, [${units !== undefined ? units : ''}]`;
	previewChart.update();
}

function updateChartTitle (title) {
	previewChart.options.plugins.title.text = title;
	previewChart.update();
}

function updateCurrentChartLine() {

	previewChart.data.datasets[0].data.push({
		x: _chartfactory.currentChartDatapointEntry.x,
		y: _chartfactory.currentChartDatapointEntry.y
	});

	previewChart.update();

}

function updateCurrentDatasetLegend(legendText) {

	previewChart.data.datasets[0].label = legendText;

	previewChart.update();

}

