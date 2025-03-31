function saveAndBeginNewChartPlot() {

	_chartfactory.sensorErrorLineDataset = [];
	currentSensorDatasetSize.innerText = _chartfactory.getSensorErrorLineDatasetCurrentLength();
	_chartfactory.currentDatasetSeries = _chartfactory.currentDatasetSeries + 1;
	
	if (inputCalibratorOutput.disabled)  inputCalibratorOutput.disabled = false;
	inputCalibratorOutput.value = null;
	_chartfactory.newDatasetFormInputs.calibratorOutput.value = null;
	
	if (inputSensorError.disabled)  inputSensorError.disabled = false;	
	inputSensorError.value = null;
	_chartfactory.newDatasetFormInputs.sensorError.value = null;

	addChartDatapointButton.style.backgroundColor = "grey";	
	["fa-solid", "fa-check", "fa-3x"].forEach(classItem => iconErrorDatapoint.classList.remove(classItem));
	iconErrorDatapoint.classList.add('fa-plus');
	addChartDatapointButton.disabled = true;
	currentSensorDatasetSize.innerText = _chartfactory.getSensorErrorLineDatasetCurrentLength();
	currentSensorDatasetSize.style.backgroundColor = 'rgb(5, 238, 94)';
	currentSensorDatasetSize.style.borderColor = 'rgb(5, 238, 94)';
	currentSensorDatasetSize.style.paddingTop = '0px';
	currentSensorDatasetSize.style.paddingBottom = '0px';

	doneSensorDataEntriesButton.disabled = false;

	const newDatasetLine = {
		label: `<blank${_chartfactory.currentDatasetSeries}>`,
		data: [],
		borderColor: chartFormats.ABSOLUTE_ERROR_OUTPUT.borderColor[_chartfactory.currentDatasetSeries],
		borderWidth: 2,
		fill: false
	}


	previewChart.data.datasets.push(newDatasetLine);

}


function diableAllSensorDataEntries() {
	inputCalibratorOutput.disabled = true;
	inputCalibratorOutput.value = 0;
	_chartfactory.newDatasetFormInputs.calibratorOutput.value = 0;
	
	inputSensorError.disabled = true;	
	inputSensorError.value = 0;
	_chartfactory.newDatasetFormInputs.sensorError.value = 0;

	addChartDatapointButton.style.backgroundColor = "grey";	
	["fa-solid", "fa-check", "fa-3x"].forEach(classItem => iconErrorDatapoint.classList.remove(classItem));
	iconErrorDatapoint.classList.add('fa-plus');
	addChartDatapointButton.disabled = true;
	currentSensorDatasetSize.innerText = _chartfactory.getSensorErrorLineDatasetCurrentLength();
	currentSensorDatasetSize.style.backgroundColor = 'rgb(5, 238, 94)';
	currentSensorDatasetSize.style.borderColor = 'rgb(5, 238, 94)';
	currentSensorDatasetSize.style.paddingTop = '0px';
	currentSensorDatasetSize.style.paddingBottom = '0px';

	addChartErrorLimitsButton.disabled = false;
	addSensorDataPlotButton.disabled = true;
	

	previewChart.data.datasets.pop();
}