// GLOBAL FACTORY for procedures  
class procedureFactory {
    constructor(
        newCalProcedureFormInputs
        ){
        this.newCalProcedureFormInputs = newCalProcedureFormInputs
    }

    isSubmitButtonActive() {      
        for (const [item, obj] of Object.entries(this.newCalProcedureFormInputs)) {            
            if (obj.value==="") {
                return false;
            }
        }
        return true;            
    }

    isEndRangeLevelGreater() {
        return this.newCalProcedureFormInputs["endRangeLevel"].value > this.newCalProcedureFormInputs["startRangeLevel"].value;
    }

    isFormInputFieldEmpty(inputName) {
        return this.newCalProcedureFormInputs[inputName].value.length === 0
    }
}
