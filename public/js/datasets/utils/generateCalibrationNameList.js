function generateCalibrationNameList(calibrationIds) {
	// Get <selection /> Html elements for Calibration names
	const calibrationSelectInput = document.getElementById("calibrationName");

  //Generate and append  <option /> Html elements from object calibrationIds: {calibrationName: _id,,,,}
	for (const property in calibrationIds) {
		let option = document.createElement("option");
		option.value = property;
		option.innerHTML = property;
		calibrationSelectInput.appendChild(option);
	}

}