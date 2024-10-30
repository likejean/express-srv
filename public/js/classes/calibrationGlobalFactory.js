// GLOBAL FACTORY for calibration record view/edit/delete page
class calibrationFactory {
    constructor(
            sensor,
            procedure,
            calibrationName,
            inputWrappers,
            newCalRecordFormInputs
        ){
        this.sensor = sensor;
        this.procedure = procedure;
        this.calibrationName = calibrationName;
        this.inputWrappers = inputWrappers;
        this.newCalRecordFormInputs = newCalRecordFormInputs;
    }

    isPatchButtonActive() {      
        for (const [item, value] of Object.entries(this.inputWrappers)) {
            if (value.status) return true;
        }
        return false;            
    }
}