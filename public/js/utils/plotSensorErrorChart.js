function createSensorDatasetsChart(datasets) {

	//returns a html element object: <div/> wrapper for charts
	const sensorChartWrapper = document.getElementById('sensor-chart-wrapper');	
	let i = 1;

	//datasets is an array that could contain one or more datasets (charts) for a sensor
	//if more than one dataset document saved for a single sensor, more than one charts will be generated and dispalyed
	for (const chart of datasets) {		

		//Canvas Initialization: prepare a default javascript canvas per each chart
		const ctx = document.createElement('canvas');		

		//create and customzie div wrappers for user buttons: delete, edit, notifications
		const btnDiv = document.createElement('div');
		const noteDiv = document.createElement('div');
		btnDiv.classList.add("modal-footer");
		noteDiv.classList.add("container", "text-center");

		//create a button to delete entire chart/dataset
		const deleteChartButton = document.createElement('button');
		deleteChartButton.innerText = "Delete";
		deleteChartButton.classList.add("admin-classified", "btn", "btn-danger", "btn-sm", "m-1");
		deleteChartButton.addEventListener("click", handleClick);
		deleteChartButton.id = `${chart._id}`;	

		
		function handleClick(e) {
			// Code to execute when the button is clicked			
			_store.activeDatasetChart = chart;
			openDatasetWarningModal();
			modal.show();
		}
		
	
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
		appendChildElementToParent(btnDiv, editChartButton);
		appendChildElementToParent(btnDiv, deleteChartButton);
		appendChildElementToParent(sensorChartWrapper, btnDiv);

		i++;
	}

	

	
}
