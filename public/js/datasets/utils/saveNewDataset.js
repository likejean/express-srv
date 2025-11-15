//This script handles saving a current sensor dataset and preparing a blank dataset for a new sensor dataset series input
//It also updates a preview chart with a new blank dataset series
//This function is called when user clicks on "+Plot" button in New Dataset Form modal window	
function saveNewChartPlot() {

	//get a database id by name of a selected calibration in drop-down meny in the New Dataset Form; store the sensor dataset in the chart factore
	_chartfactory.storeChartLineDataset(_store.getCalibrationIdByName(_chartfactory.newDatasetFormInputs.calibrationName.value));
	
	//reset a current error line dataset
	_chartfactory.currentSensorErrorLineDataset = [];

	//get a size of current dataset: must be ZERO at this point
	currentSensorDatasetSize.innerText = _chartfactory.getSensorErrorLineDatasetCurrentLength();	
	
	//update chart series counter
	_chartfactory.currentDatasetSeries = _chartfactory.currentDatasetSeries + 1;
	//currentPlotSeriesCount.innerText = _chartfactory.currentDatasetSeries;
	
	//enables user input fields for next dataset series
	if (inputCalibratorOutput.disabled)  inputCalibratorOutput.disabled = false;
	inputCalibratorOutput.value = null;
	_chartfactory.newDatasetFormInputs.calibratorOutput.value = null;
	
	if (inputSensorError.disabled)  inputSensorError.disabled = false;	
	inputSensorError.value = null;
	_chartfactory.newDatasetFormInputs.sensorError.value = null;

	//reset buttons and input css styling dynamically before starting a new dataset for the chart
	addChartDatapointButton.style.backgroundColor = "grey";	
	["fa-solid", "fa-check",].forEach(classItem => iconErrorDatapoint.classList.remove(classItem));
	iconErrorDatapoint.classList.add('fa-plus');
	
	//disable add button for sensor datapoint
	addChartDatapointButton.disabled = true;
	currentSensorDatasetSize.innerText = _chartfactory.getSensorErrorLineDatasetCurrentLength();
	currentSensorDatasetSize.style.backgroundColor = 'rgb(5, 238, 94)';
	currentSensorDatasetSize.style.borderColor = 'rgb(5, 238, 94)';
	currentSensorDatasetSize.style.paddingTop = '0px';
	currentSensorDatasetSize.style.paddingBottom = '0px';

	//reset input fields and buttons states
	inputCalibratorOutput.value = null;	
	inputSensorError.value = null;
	prepareDatasetButton.disabled = false;
	if(_chartfactory.newDatasetFormInputs.errorType.value) addChartErrorLimitsButton.disabled = false;
	addSensorDataPlotButton.disabled = true;

	//disable remove button if current dataset size is zero	
	if(_chartfactory.getSensorErrorLineDatasetCurrentLength() === 0) {
		removeChartDatapointButton.disabled = true;
	}

	//prepare a blank object item for next chart dataset
	const newDatasetLine = {
		label: `<blank${_chartfactory.currentDatasetSeries}>`,
		data: [],
		borderColor: chartFormats.ABSOLUTE_ERROR_OUTPUT.borderColor[_chartfactory.currentDatasetSeries],
		borderWidth: 2,
		fill: false
	}

	//insert a blank object into Preview chart and rerender it
	previewChart.data.datasets.push(newDatasetLine);

}