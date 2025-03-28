function updateChartLabelUnits (xLabel, yLabel, units) {
	previewChart.options.scales.x.title.text = `${xLabel}, [${units !== undefined ? units : ''}]`;
	previewChart.options.scales.y.title.text = `${yLabel}, [${units !== undefined ? units : ''}]`;
	previewChart.update();
}

//This functin updates the sensor chart title
function updateChartTitle (title) {
	previewChart.options.plugins.title.text = title;
	previewChart.update();
}

//This function updates the first series dataset for a sensor chart
function updateCurrentChartLine() {
	previewChart.data.datasets[0].data.push({
		x: _chartfactory.currentChartDatapointEntry.x,
		y: _chartfactory.currentChartDatapointEntry.y
	});
	previewChart.update();

}

//This function updates legent text for the first series dataset
function updateCurrentDatasetLegend(legendText) {
	previewChart.data.datasets[0].label = legendText;
	previewChart.update();

}

//This function updates legent text for the first series dataset
function addErrorLimitChartLines(upperLimitDataset, lowerLimitDataset) {

	
	var upperErrorLimitLineFormats  = {
		label: 'UPPER ERROR LIMIT',
		data: upperLimitDataset,
		...chartFormats.UPPER_ERROR_LIMIT
	}; 

	var lowerErrorLimitLineFormats = {
		label: 'LOWER ERROR LIMIT',
		data: lowerLimitDataset,
		...chartFormats.LOWER_ERROR_LIMIT
	}

	previewChart.data.datasets.push(upperErrorLimitLineFormats);
	previewChart.data.datasets.push(lowerErrorLimitLineFormats);

	previewChart.update();

}


