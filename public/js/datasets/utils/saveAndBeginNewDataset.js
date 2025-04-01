function saveAndBeginNewChartPlot() {

	//get a database id by the name of a selected calibration in drop-down meny in the New Dataset Form; store the sensor dataset in the chart factore
	_chartfactory.storeChartLineDataset(_store.getCalibrationIdByName(_chartfactory.newDatasetFormInputs.calibrationName.value));
	
	//reset a current error line dataset
	_chartfactory.currentSensorErrorLineDataset = [];

	//get a size of the current dataset: must be ZERO at this point
	currentSensorDatasetSize.innerText = _chartfactory.getSensorErrorLineDatasetCurrentLength();
	
	//update the chart series counter
	_chartfactory.currentDatasetSeries = _chartfactory.currentDatasetSeries + 1;
	
	//enables user input fields for the next dataset series
	if (inputCalibratorOutput.disabled)  inputCalibratorOutput.disabled = false;
	inputCalibratorOutput.value = null;
	_chartfactory.newDatasetFormInputs.calibratorOutput.value = null;
	
	if (inputSensorError.disabled)  inputSensorError.disabled = false;	
	inputSensorError.value = null;
	_chartfactory.newDatasetFormInputs.sensorError.value = null;

	//reset buttons and input css styling dynamically before starting a new dataset for the chart
	addChartDatapointButton.style.backgroundColor = "grey";	
	["fa-solid", "fa-check", "fa-3x"].forEach(classItem => iconErrorDatapoint.classList.remove(classItem));
	iconErrorDatapoint.classList.add('fa-plus');
	addChartDatapointButton.disabled = true;
	currentSensorDatasetSize.innerText = _chartfactory.getSensorErrorLineDatasetCurrentLength();
	currentSensorDatasetSize.style.backgroundColor = 'rgb(5, 238, 94)';
	currentSensorDatasetSize.style.borderColor = 'rgb(5, 238, 94)';
	currentSensorDatasetSize.style.paddingTop = '0px';
	currentSensorDatasetSize.style.paddingBottom = '0px';

	//enable the DONE button in case if a user finished plots creation for the chart
	doneSensorDataEntriesButton.disabled = false;

	//prepare a blank object item for the next chart dataset
	const newDatasetLine = {
		label: `<blank${_chartfactory.currentDatasetSeries}>`,
		data: [],
		borderColor: chartFormats.ABSOLUTE_ERROR_OUTPUT.borderColor[_chartfactory.currentDatasetSeries],
		borderWidth: 2,
		fill: false
	}

	//insert a blank object into the Preview chart and rerender it
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
	
}