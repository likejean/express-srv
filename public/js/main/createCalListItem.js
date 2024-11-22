function createCalibrationListItem (data, calLocation, calList) {     //called in showSensorInfoCard.js
    
    for (let i = 0; i < data.length; i++){

		let toastItem = document.createElement("div");
		["toast", "show", "m-2", "w-50"].forEach(classItem => toastItem.classList.add(classItem));
		toastItem.setAttribute('id', `${data[i]._id}`);
		toastItem.setAttribute("role","alert");		
		toastItem.setAttribute("aria-live", "assertive");
		toastItem.setAttribute("aria-atomic","true");
		
		toastItem.innerHTML = generateToastHtmlItem (
			`./html/editCalibrationEvent.html?id=${data[i]._id}`, 
			`${data[i].calibrationName.replace(/{/g, "").replace(/}/g, "")}`, 
			data[i],
			calLocation
		);

		calList.appendChild(toastItem);		
	}    
}