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
    for (const [item, obj] of Object.entries(this.newCalRecordFormInputs)) {
      if (obj.value === "") {
        return false;
      }
    }
    return true;
  }

  isFormInputFieldEmpty(inputName) {
    return this.newCalRecordFormInputs[inputName].value.length === 0;
  }

  isPatchButtonActive() {
    for (const [item, value] of Object.entries(this.inputWrappers)) {
      if (value.status) return true;
    }
    return false;
  }
}
