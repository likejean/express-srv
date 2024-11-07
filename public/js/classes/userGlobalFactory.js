// GLOBAL FACTORY for sensors
class userFactory {
    constructor(
			inputWrappers,
            newUserFormInputs
        ){
		this.inputWrappers = inputWrappers,
        this.newUserFormInputs = newUserFormInputs
    }

    isSubmitButtonActive() {      
        for (const [item, obj] of Object.entries(this.newUserFormInputs)) {            
            if (obj.value === "") {
                return false;
            }
        }
        return true;
    }

    isFormInputFieldEmpty(inputName) {
        return this.newUserFormInputs[inputName].value.length === 0
    }

	isPatchButtonActive() {
        for (const [item, value] of Object.entries(this.inputWrappers)) {
            if (value.status) return true;
        }
        return false;
    }
}


