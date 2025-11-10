//this function creates and appends list items to the calibration list in the sensor info card
//it is called in showSensorInfoCard.js
function createCalibrationListItem (data, calLocation, calList) {     //called in showSensorInfoCard.js

	   
	//data = array of calibration objects associated with selected sensor
	//calLocation = location where calibration was performed (string)
	//calList = HTML element where dynamically created list items are appended (HTML DOM element)
    
	//this loop creates and appends list items to the calibration list in the sensor info card
	//each list item is a toast component containing calibration details and a link to edit the calibration event
	//the link contains a query string with the calibration _id to identify which calibration to edit
	//the list items are created based on the data array passed to the function
	//the calLocation parameter is used to display the location of the calibration in each list item
	//the calList parameter is the HTML element where the list items are appended
	for (let i = 0; i < data.length; i++){

		let toastItem = document.createElement("div");
		["toast", "show", "m-2", "w-50"].forEach(classItem => toastItem.classList.add(classItem));
		toastItem.setAttribute('id', `${data[i]._id}`);
		toastItem.setAttribute("role","alert");		
		toastItem.setAttribute("aria-live", "assertive");
		toastItem.setAttribute("aria-atomic","true");
		
		//generate inner HTML for each list item (toast component)
		toastItem.innerHTML = generateToastHtmlItem (
			//link to edit calibration event page with query string containing calibration _id
			`./html/editCalibrationEvent.html?id=${data[i]._id}`, 
			`${data[i].calibrationName.replace(/{/g, "").replace(/}/g, "")}`, 
			data[i],
			calLocation
		);

		calList.appendChild(toastItem);		
	}    
}