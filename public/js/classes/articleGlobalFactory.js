// GLOBAL FACTORY for articles  
class articleFactory {
    constructor(
        newArticleFormInputs
        ){
        this.newArticleFormInputs = newArticleFormInputs
    }

    isSubmitButtonActive() {      
        for (const [item, obj] of Object.entries(this.newArticleFormInputs)) {            
            if (obj.value === "") {
                return false;
            }
        }
        return true;            
    }

	isValidationRuleApplied(inputName, inputValue) {
        // Convert the function to a string and remove whitespace
        const funcString = this.newArticleFormInputs[inputName].validator
        .toString()
        .trim();

        // Check if the function body for validator is empty
		//If empty, no validation rule is applied
        if (funcString === "function () {}" || funcString === "() => {}") {
			return {
				rule: "",
				isValid: true,
			};
        } else {
			//If not empty, validation rule is applied
			return {
				rule: this.newArticleFormInputs[inputName].validator(inputValue)
				? ""
				: this.newArticleFormInputs[inputName].inputRule,
				isValid: this.newArticleFormInputs[inputName].validator(inputValue),
			};
		}
    }

    isFormInputFieldEmpty(inputName) {
        return this.newArticleFormInputs[inputName].value.length === 0
    }
}
