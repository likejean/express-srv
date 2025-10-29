const checkBox = document.getElementById("procedureAssociated");
const procedureListWrapper = document.querySelector(".calibration-procedures-list");
const selectProcedureOptions = document.getElementById("calibrationProcedures");

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
	} else {
		procedureListWrapper.style.display = "none";
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

createSelectProcedureOptions ()