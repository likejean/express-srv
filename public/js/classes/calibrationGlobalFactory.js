// GLOBAL FACTORY for calibration record view/edit/delete page
class calibrationFactory {
    constructor(
            calibrationName, 
            sensor,
            procedure,
            inputWrappers,
        ){
        this.sensor = sensor;
        this.procedure = procedure;
        this.calibrationName = calibrationName;
        this.calNameWrapper = calNameWrapper;
        this.inputWrappers = inputWrappers;
    }

    isPatchButtonActive() {      
        for (const [item, value] of Object.entries(this.inputWrappers)) {
            if (value.status) return true;
        }
        return false;            
    }
}