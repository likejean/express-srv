// GLOBAL FACTORY for procedures  
class procedureFactory {
    constructor(inputWrappers, newCalProcedureFormInputs){
		this.inputWrappers = inputWrappers
        this.newCalProcedureFormInputs = newCalProcedureFormInputs
    }

    isSubmitButtonActive() {      
        for (const [item, obj] of Object.entries(this.newCalProcedureFormInputs)) {            
            if (obj.value === "") {
                return false;
            }
        }
        return true;            
    }

    isEndRangeLevelGreater() {
        return Number(this.newCalProcedureFormInputs["endRangeLevel"].value) > Number(this.newCalProcedureFormInputs["startRangeLevel"].value);
    }

    isFormInputFieldEmpty(inputName) {
        return this.newCalProcedureFormInputs[inputName].value.length === 0
    }

	isPatchButtonActive() {
        for (const [item, value] of Object.entries(this.inputWrappers)) {
            if (value.status) return true;
        }
        return false;
    }
}
