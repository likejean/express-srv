// GLOBAL FACTORY for new sensor form 
class sensorFactory {
    constructor(
            newSensorFormInputs
        ){
        this.newSensorFormInputs = newSensorFormInputs
    }

    isSubmitButtonActive() {      
        for (const [item, obj] of Object.entries(this.newSensorFormInputs)) {            
            if (obj.value==="") {
                return false;
            }
        }
        return true;            
    }

    isFormInputFieldEmpty(inputName) {
        return this.newSensorFormInputs[inputName].value.length === 0
    }
}

