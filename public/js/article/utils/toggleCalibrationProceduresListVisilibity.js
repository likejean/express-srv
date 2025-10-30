const checkBox = document.getElementById("procedureAssociated");
const procedureListWrapper = document.querySelector(".calibration-procedures-list-wrapper");
const selectProcedureOptions = document.getElementById("calibrationProcedures");
const calibrationProcedureQuantity = document.querySelector(".calibration-procedures-quantity");
const resetProcedureQuantityButton = document.querySelector(".procedures-quantity-reset-button");
const quantityCounterWrapper = document.querySelector(".counter-wrapper");
const quantityResetButtonWrapper = document.querySelector(".reset-button-wrapper");

checkBox.addEventListener('change', function() {
        if (this.checked) {
			toggleCalibrationProceduresVisibility(true);
        } else {
			toggleCalibrationProceduresVisibility(false);
        }
	});


function toggleCalibrationProceduresVisibility(checkedStatus) {	
	if (checkedStatus) {
		procedureListWrapper.style.display = "block"; // Or "initial", "flex", "grid", etc., depending on desired display
		quantityCounterWrapper.style.display = "block";
		quantityResetButtonWrapper.style.display = "block";
	} else {
		procedureListWrapper.style.display = "none";
		quantityCounterWrapper.style.display = "none";
		quantityResetButtonWrapper.style.display = "none";
	}
}

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