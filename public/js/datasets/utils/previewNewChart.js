
const previewNewChartWrapper = document.getElementById('preview-new-chart-wrapper');
const ctx = document.createElement('canvas');	
ctx.style.minWidth = "650px";
var previewChart = new Chart(ctx.getContext('2d'), config);
previewNewChartWrapper.appendChild(ctx);


function newChartInit (chartOptions) {

	updateChartTitle(chartOptions.chartTitle.value);
	updateChartLabelUnits(chartOptions.chartXLabel.value, chartOptions.chartYLabel.value, chartOptions.datasetUnits.value);

}



