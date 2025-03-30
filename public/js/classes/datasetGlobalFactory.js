// GLOBAL FACTORY for datasets
class datasetFactory {
    constructor(
			inputWrappers,
            newDatasetFormInputs,
			currentChartDatapointEntry = {x: 0, y: 0},
            sensorErrorLineDataset = [],
			errorUpperLimitLineDataset = [],
			errorLowerLimitLineDataset = [],
			
        ){
		this.inputWrappers = inputWrappers,
        this.newDatasetFormInputs = newDatasetFormInputs,
		this.currentChartDatapointEntry = currentChartDatapointEntry,
        this.sensorErrorLineDataset = sensorErrorLineDataset,
		this.errorUpperLimitLineDataset = errorUpperLimitLineDataset,
		this.errorLowerLimitLineDataset = errorLowerLimitLineDataset
		
    }

	//obtains a current size of the sensorErrorLineDataset array
	getSensorErrorLineDatasetCurrentLength () {
		return this.sensorErrorLineDataset.length;
	}

    //updates a current datapoint object for global factory
	insertChartDatapoint(value, type) {
		type === "calibratorOutput" ? this.currentChartDatapointEntry.x = value :  this.currentChartDatapointEntry.y = value;
	}
	
    //constructs a dataset for sensor linearity and hysteresis output
    buildSensorErrorOutputChartLine(datapoint) {
        this.sensorErrorLineDataset.push(datapoint);
    }

    //constructs a dataset for chart lines to display upper and lower error limits
	buildErrorLimitChartLines() {
        let x, y;
		var increament = (Number(this.newDatasetFormInputs.datasetEndAt.value) - Number(this.newDatasetFormInputs.datasetStartAt.value)) / 10;				
		for (var i = 0; i <= 10; i++){
			x = Number(this.newDatasetFormInputs.datasetStartAt.value) + i * increament;
			y = Math.abs((Number(this.newDatasetFormInputs.datasetStartAt.value) + i * increament)) * Number(this.newDatasetFormInputs.errorPercentLimit.value) / 100;
			
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

}
