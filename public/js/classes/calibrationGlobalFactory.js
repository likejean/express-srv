// GLOBAL FACTORY for calibration record view/edit/delete page
class calibrationFactory {
    constructor(
        sensor,
        procedure,
        calibrationName,
        inputWrappers,
        newCalRecordFormInputs,
		certificateInfoIcon
    ) {
        this.sensor = sensor;
        this.procedure = procedure;
        this.calibrationName = calibrationName;
        this.inputWrappers = inputWrappers;
        this.newCalRecordFormInputs = newCalRecordFormInputs;
		this.certificateInfoIcon = certificateInfoIcon;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    //if a value of active input is empty string, returns FALSE (disables SUBMIT button); Otherwise, it returns TRUE to activate SUBMIT button in New Calibration Form
    isSubmitButtonActive() {
        for (const key in this.newCalRecordFormInputs) {
            if (typeof this.newCalRecordFormInputs[key] === "object") {
                for (const subkey in this.newCalRecordFormInputs[key]) {                    
                    if(subkey === "value" && this.newCalRecordFormInputs[key][subkey] === "") return false; 
                }
            }
        }
        return true;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////
	//////this method determines if a validation rule applied to any field in New Calibration Record Form
    //if there is a validation rule applied, it outputs a warning message if user inputs do not meet validation rules.

    isValidationRuleApplied(inputName, inputValue) {
        // Convert the function to a string and remove whitespace
        const funcString = this.newCalRecordFormInputs[inputName].validator
        .toString()
        .trim();

        // Check if the function body for validator is empty
        if (funcString === "function () {}" || funcString === "() => {}") {
			return {
				rule: "",
				isValid: true,
			};
        } else {
			return {
				rule: this.newCalRecordFormInputs[inputName].validator(inputValue)
				? ""
				: this.newCalRecordFormInputs[inputName].inputRule,
				isValid: this.newCalRecordFormInputs[inputName].validator(inputValue),
			};
		}
    }

    //this method determines if there is any empty string in a New Calibration Record Form input field left
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
