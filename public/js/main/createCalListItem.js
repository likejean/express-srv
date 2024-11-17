//this function creates list of all calibrations associated with specified sensor

function generateToastHtmlItem (link, certificateName, data, location) {
	//Get a current time in unix format
    const unixTimestamp = moment().unix();

	return `<div class="toast-header">
			<a href="${link}">
				<i class="fas fa-2x fa-certificate mx-1" style="color:${moment.utc(data.dueCalibrationDate).unix() > unixTimestamp ? "green" : "red"};">
				</i>
			</a>
			<strong id="certificate-name" class="me-auto">${certificateName}</strong>
			<small>11 mins ago</small>
			<button type="button" class="btn-close" data-bs-dismiss="toast"></button>			
		</div>
		<div class="toast-body">
			<p>Location: ${location}</p>
			<p>Last Date: ${moment.utc(data.lastCalibrationDate).format('dddd, MM/DD/YYYY')}</p>
			<p>Due Date: ${moment.utc(data.dueCalibrationDate).format('dddd, MM/DD/YYYY')}</p>
			<p>Extended? ${data.calibrationExtended ? 'YES' : 'NO'}</p>
			<p>Expired? ${moment.utc(data.dueCalibrationDate).unix()>unixTimestamp? "NO" : "YES"}</p>
		</div>`
}

function createCalibrationListItem (data, list, calName, calLocation, certList) {     //called in showSensorInfoCard.js
    //Get a current time in unix format
    const unixTimestamp = moment().unix();     

    for (let i = 0; i < data.length; i++){

		let toastItem = document.createElement("div");
		toastItem.classList.add("toast");
		toastItem.classList.add("show");
		toastItem.classList.add("mx-2");
		toastItem.classList.add("my-2");
		toastItem.setAttribute('id', `${data[i]._id}`)
		toastItem.setAttribute("role","alert");		
		toastItem.setAttribute("aria-live", "assertive")
		toastItem.setAttribute("aria-atomic","true")
		
		toastItem.innerHTML = generateToastHtmlItem (
			`./html/editCalibrationEvent.html?id=${data[i]._id}`, 
			`${data[i].calibrationName.replace(/{/g, "").replace(/}/g, "")}`, 
			data[i],
			calLocation
		);

		certList.appendChild(toastItem);




		let listItem = document.createElement("li");
		let calLinkItem = document.createElement("a");        

		let lastCalDate = moment.utc(data[i].lastCalibrationDate);
		let dueCalDate = moment.utc(data[i].dueCalibrationDate);
		let extenstionStatus = data[i].calibrationExtended;


		//add url with query params to navigate Calibration Event Card for edits
		calLinkItem.setAttribute('id', `${data[i]._id}`)
		calLinkItem.href=`./html/editCalibrationEvent.html?id=${data[i]._id}`;       

		//add class attributes to calName badge and calInfo list item
		calLinkItem.classList.add('list-group-item');		
		listItem.classList.add('list-group-item');
		calLinkItem.classList.add('d-flex');
		listItem.classList.add('d-flex');
		calLinkItem.classList.add('justify-content-center');

		calLinkItem.innerHTML = `<i class="fas fa-certificate"></i>`;

		//if(data[i].calibrationExtended) calLinkItem.innerHTML = `<span id="extensionStatus" class="badge badge-success">EXT</span>`;
		
		//CAL INFO LIST/////////////////////////////////////////////////////////
		//add css styles to calName badge and calInfo list item
		listItem.style.color = dueCalDate.unix() > unixTimestamp ? "black" : "red";       
		calLinkItem.style.backgroundColor = dueCalDate.unix() > unixTimestamp ? "green" : "red";        
		calLinkItem.style.color = "white";  

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
		//calLinkItem.appendChild(calNameText); 
		listItem.appendChild(calInfoText); 
		list.appendChild(listItem); 
		calName.appendChild(calLinkItem);      
		
	}    
}