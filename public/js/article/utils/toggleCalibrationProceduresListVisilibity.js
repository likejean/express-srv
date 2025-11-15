const checkBox = document.getElementById("procedureAssociated");
const procedureListWrapper = document.querySelector(".calibration-procedures-list-wrapper");
const selectProcedureOptions = document.getElementById("calibrationProcedures");
const calibrationProcedureQuantity = document.querySelector(".calibration-procedures-quantity");
const resetProcedureQuantityButton = document.querySelector(".procedures-quantity-reset-button");
const quantityCounterWrapper = document.querySelector(".counter-wrapper");
const quantityResetButtonWrapper = document.querySelector(".reset-button-wrapper");

//
checkBox.addEventListener('change', function() {
        if (this.checked) {
			toggleCalibrationProceduresVisibility(true);
        } else {
			toggleCalibrationProceduresVisibility(false);
        }
	});


//this function toggles the visibility of the calibration procedures list
function toggleCalibrationProceduresVisibility(checkedStatus) {	
	if (checkedStatus) {
		procedureListWrapper.style.display = "block"; // Or "initial", "flex", "grid", etc., depending on desired display
		quantityCounterWrapper.classList.replace("d-none", "d-flex");
		quantityResetButtonWrapper.classList.replace("d-none", "d-flex");
	} else {
		procedureListWrapper.style.display = "none";
		quantityCounterWrapper.classList.replace("d-flex", "d-none");
		quantityResetButtonWrapper.classList.replace("d-flex", "d-none");
	}
}

//this function creates and appends options to the select element for calibration procedures
function createSelectProcedureOptions () {
	fetchAllCalProcedureData().then(() => {
		const namesObject = _store.getCalProcedureNames();
		Object.keys(namesObject).forEach((key) => {
			let option = document.createElement('option');
			option.textContent = key;
			option.value = namesObject[key];
			selectProcedureOptions.appendChild(option);
		});
	})
}

createSelectProcedureOptions();