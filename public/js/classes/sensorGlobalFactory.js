// GLOBAL FACTORY for sensors
class sensorFactory {
    constructor(
			inputWrappers,
            newSensorFormInputs
        ){
		this.inputWrappers = inputWrappers,
        this.newSensorFormInputs = newSensorFormInputs
    }

    isSubmitButtonActive() {      
        for (const [item, obj] of Object.entries(this.newSensorFormInputs)) {			      
            if (obj.value === "") {
                return false;
            }
        }
        return true;
    }

    isFormInputFieldEmpty(inputName) {
        return this.newSensorFormInputs[inputName].value.length === 0
    }

	//activates SUBMIT/SAVE button if, at least, one input field is active (updated)
	isPatchButtonActive() {
        for (const [item, value] of Object.entries(this.inputWrappers)) {
            if (value.status) return true;
        }
        return false;
    }

}

