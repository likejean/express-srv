//this function creates list of all calibrations associated with specified sensor
function createCalibrationListItem (data, list, calName, calLocation) {     //called in showSensorInfoCard.js
    //Get a current time in unix format
    const unixTimestamp = moment().unix();     

    for (let i=0; i < data.length; i++){
		let listItem = document.createElement("li");
		let badgeItem = document.createElement("a");        

		let lastCalDate = moment.utc(data[i].lastCalibrationDate);
		let dueCalDate = moment.utc(data[i].dueCalibrationDate);
		let extenstionStatus = data[i].calibrationExtended;


		//add url with query params to navigate Calibration Event Card for edits
		badgeItem.setAttribute('id', `${data[i]._id}`)
		badgeItem.classList.add('calibration-record-link');
		badgeItem.href=`./html/editCalibrationEvent.html?id=${data[i]._id}`;       

		//add class attributes to calName badge and calInfo list item
		badgeItem.classList.add('list-group-item');
		listItem.classList.add('list-group-item');
		badgeItem.classList.add('d-flex');
		listItem.classList.add('d-flex');

		if(data[i].calibrationExtended) badgeItem.innerHTML = `<span id="extensionStatus" class="badge badge-success">EXT</span>`;
		
		//CAL INFO LIST/////////////////////////////////////////////////////////
		//add css styles to calName badge and calInfo list item
		listItem.style.color = dueCalDate.unix() > unixTimestamp ? "black" : "red";       
		badgeItem.style.backgroundColor = dueCalDate.unix() > unixTimestamp ? "green" : "red";        
		badgeItem.style.color = "white";  

		const calNameText = document.createTextNode(`
			${data[i].calibrationName.replace(/{/g, "").replace(/}/g, "")}`
		);

		const calInfoText = document.createTextNode(`
			Where? ${calLocation}
			\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0Last Date: ${lastCalDate.format('dddd, MM/DD/YYYY')}
			\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0Due Date: ${dueCalDate.format('dddd, MM/DD/YYYY')}
			\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0Extended? ${extenstionStatus?"YES":"NO"}
			\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0Expired? ${dueCalDate.unix()>unixTimestamp?"NO":"YES"}`
		);	   
		badgeItem.appendChild(calNameText); 
		listItem.appendChild(calInfoText); 
		list.appendChild(listItem); 
		calName.appendChild(badgeItem);      
		
	}    
}