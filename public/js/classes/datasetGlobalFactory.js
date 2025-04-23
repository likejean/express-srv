// GLOBAL FACTORY for datasets
class datasetFactory {
    constructor(
			inputWrappers,
            newDatasetFormInputs,			
			dataset,
            calibrations,
			currentDatasetSeries = 0,
			currentChartDatapointEntry = {x: 0, y: 0},
            currentSensorErrorLineDataset = [],
            sensorDatasets = [],
			errorUpperLimitLineDataset = [],
			errorLowerLimitLineDataset = [],
			
        ){
		this.inputWrappers = inputWrappers,
        this.newDatasetFormInputs = newDatasetFormInputs,
		this.dataset = dataset,
        this.calibrations = calibrations,
		this.currentDatasetSeries = currentDatasetSeries,
		this.currentChartDatapointEntry = currentChartDatapointEntry,
        this.currentSensorErrorLineDataset = currentSensorErrorLineDataset,
        this.sensorDatasets = sensorDatasets,
		this.errorUpperLimitLineDataset = errorUpperLimitLineDataset,
		this.errorLowerLimitLineDataset = errorLowerLimitLineDataset
		
    }

	//obtains a current size of the currentSensorErrorLineDataset array
	getSensorErrorLineDatasetCurrentLength () {
		return this.currentSensorErrorLineDataset.length;
	}

	//store temporarily a current chart plot
    storeChartLineDataset (calibrationId) {
        this.sensorDatasets.push({
            plotId: `Plot${this.sensorDatasets.length + 1}`,
            seriesLabel: this.newDatasetFormInputs.seriesLabel.value,
            seriesDescription: this.newDatasetFormInputs.seriesDescription.value,			
            calibrationName: this.newDatasetFormInputs.calibrationName.value,
			calibrationId,
            dataset: this.currentSensorErrorLineDataset
        });
    }

    //updates a current datapoint object for global factory
	insertChartDatapoint(value, type) {
		type === "calibratorOutput" ? this.currentChartDatapointEntry.x = value :  this.currentChartDatapointEntry.y = value;
	}
	
    //constructs a dataset for sensor linearity and hysteresis output
    buildSensorErrorOutputChartLine(datapoint) {
        this.currentSensorErrorLineDataset.push(datapoint);
    }

    //constructs a dataset for chart lines to display upper and lower error limits (based on error type selected)
	buildErrorLimitChartLines() {
        let x, y;
		var increament = (Number(this.newDatasetFormInputs.datasetEndAt.value) - Number(this.newDatasetFormInputs.datasetStartAt.value)) / 10;				
		for (var i = 0; i <= 10; i++){
			if (this.newDatasetFormInputs.errorType.value === "Relative Error"){   //in error percentage [%]
				x = Number(this.newDatasetFormInputs.datasetStartAt.value) + i * increament;
				y = Math.abs((Number(this.newDatasetFormInputs.datasetStartAt.value) + i * increament)) * Number(this.newDatasetFormInputs.errorLimit.value) / 100;
			}else{  //in absolute measurement units
				x = Number(this.newDatasetFormInputs.datasetStartAt.value) + i * increament;
				y = Number(this.newDatasetFormInputs.errorLimit.value);
			}			
			
			this.errorUpperLimitLineDataset.push({x: Number(x.toFixed(4)), y: Number(y.toFixed(6))});
			this.errorLowerLimitLineDataset.push({x: Number(x.toFixed(4)), y: -Number(y.toFixed(6))});
		}
	}

	//allows to activate submit button only if all input fields are not empty
    isSubmitButtonActive() {      
        for (const [item, obj] of Object.entries(this.newDatasetFormInputs)) {
            if (obj.value === "" || obj.value === null) {
                return false;
            }
        }
        return true;
    }

    //hightlights the user input borders
    isFormInputFieldEmpty(inputName) {
        return this.newDatasetFormInputs[inputName].value.length === 0
    }

	//activates SUBMIT/SAVE button if, at least, one input field is active (updated)
	isPatchButtonActive() {
        for (const [item, value] of Object.entries(this.inputWrappers)) {
            if (value.status) return true;
        }
        return false;
    }

    //obtain sensor calibration names
	getSensorCalibrationNames(){
		return this.calibrations.reduce((obj, calibration) => {
            obj[`${calibration.calibrationName}`] = calibration._id;
            return obj;
        }, {});;
	}
    

}
