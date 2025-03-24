function updateChartLabelUnits (xLabel, yLabel, units) {
	previewChart.options.scales.x.title.text = `${xLabel}, [${units !== undefined ? units : ''}]`;
	previewChart.options.scales.y.title.text = `${yLabel}, [${units !== undefined ? units : ''}]`;
	previewChart.update();
}

function updateChartTitle (title) {
	previewChart.options.plugins.title.text = title;
	previewChart.update();
}

function updateChartXRange (start, end, size) {
	
	
	//previewChart.data.labels = range;
	previewChart.update();

}