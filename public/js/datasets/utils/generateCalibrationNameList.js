function generateCalibrationNameList(calibrationIds) {
	// Get <selection /> Html elements for Calibration names
	const calibrationSelectInput = document.getElementById("calibrationId");

  //Generate and append  <option /> Html elements for Calibration Names
	for (const property in calibrationIds) {
		let option = document.createElement("option");
		option.value = property;
		option.innerHTML = property;
		calibrationSelectInput.appendChild(option);
	}

}