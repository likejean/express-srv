function createSensorDatasetsChart(datasets) {

	//returns a html element object: <div/> wrapper for charts
	const sensorChartWrapper = document.getElementById('sensor-chart-wrapper');
	let i = 1;

	//datasets is an array that could contain one or more datasets (charts) for a sensor
	//if more than one dataset document saved for a single sensor, more than one charts will be generated and dispalyed
	for (const chart of datasets) {		

		//Canvas Initialization: prepare a default javascript canvas per each chart
		const ctx = document.createElement('canvas');		

		//create and customzie div wrapper for user buttons: delete, edit
		const div = document.createElement('div');
		div.classList.add("modal-footer");

		//create a button to delete entire chart/dataset
		const deleteChartButton = document.createElement('button');
		deleteChartButton.innerText = "Delete";
		deleteChartButton.classList.add("admin-classified", "btn", "btn-danger", "btn-sm", "m-1");
		deleteChartButton.setAttribute('data-bs-toggle', 'modal');
		deleteChartButton.setAttribute('data-bs-target', `#chart-1`);
		deleteChartButton.id = `chart-${i}`;	


		
		//attach the onclick event to execute axios delete by ID resquest when the button is clicked		
		deleteChartButton.onclick = function() {
			deleteDatasetRecord(chart._id);
		};


		//create a button to delete entire chart/dataset
		const editChartButton = document.createElement('a');
		editChartButton.setAttribute('href', `./html/editChart.html?id=${chart._id}`);
		editChartButton.innerText = "Edit";
		editChartButton.classList.add("admin-classified", "btn", "btn-primary", "btn-sm", "my-1");		
		editChartButton.id = `chart-${i}`;

				
		//chart series data collection
		let sensorData = {
			sensorDatasets: chart.sensorDatasets,
			errorUpperLimit: chart.errorUpperLimit,
			errorLowerLimit: chart.errorLowerLimit
		};

		//chart options collection (title, x-y labels)
		let options = {
			chartTitle: chart.chartTitle,
			chartXLabel: chart.chartXLabel,
			chartYLabel: chart.chartYLabel,
		};

		//Chart.js: creating an instance of a chart object. 
		new Chart(
			ctx.getContext('2d'),
			//processed chart data and options into a format suitable for rendering
			getSensorDatasetsChartConfig(generateSensorDatasetsChartData(sensorData), options)
		);

		//append chart-customized canvas and buttons to html document
		appendChildElementToParent(sensorChartWrapper, ctx);		
		appendChildElementToParent(div, editChartButton);
		appendChildElementToParent(div, deleteChartButton);
		appendChildElementToParent(sensorChartWrapper, div);

		i++;
	}

	
}
