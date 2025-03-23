// GLOBAL FACTORY for datasets
class datasetFactory {
    constructor(
			inputWrappers,
            newDatasetFormInputs
        ){
		this.inputWrappers = inputWrappers,
        this.newDatasetFormInputs = newDatasetFormInputs
    }

	//allows to activate submit button only if all input fields are not empty
    isSubmitButtonActive() {      
        for (const [item, obj] of Object.entries(this.newDatasetFormInputs)) {
            if (obj.value === "") {
                return false;
            }
        }
        return true;
    }

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
