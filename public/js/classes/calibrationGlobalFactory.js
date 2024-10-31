// GLOBAL FACTORY for calibration record view/edit/delete page
class calibrationFactory {
  constructor(
    sensor,
    procedure,
    calibrationName,
    inputWrappers,
    newCalRecordFormInputs
  ) {
    this.sensor = sensor;
    this.procedure = procedure;
    this.calibrationName = calibrationName;
    this.inputWrappers = inputWrappers;
    this.newCalRecordFormInputs = newCalRecordFormInputs;
  }

  isSubmitButtonActive() {
    for (const key in this.newCalRecordFormInputs) {
      if (typeof this.newCalRecordFormInputs[key] === "object") {
        for (const subkey in this.newCalRecordFormInputs[key]) {
          if (subkey === "value" && this.newCalRecordFormInputs[key][subkey] === "") return false;
        }
      }
    }
    return true;
  }

  isFormInputFieldEmpty(inputName) {
    if (inputName === "adjustmentsMade" || inputName === "calibrationExtended")
      return false;
    else return this.newCalRecordFormInputs[inputName].value.length === 0;
  }

  isPatchButtonActive() {
    for (const [item, value] of Object.entries(this.inputWrappers)) {
      if (value.status) return true;
    }
    return false;
  }
}
