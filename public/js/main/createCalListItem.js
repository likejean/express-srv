//this function creates list of all calibrations associated with specified sensor

function generateToastHtmlItem (link, certificateName, data, location) {
	//Get a current time in unix format
    const unixTimestamp = moment().unix();
	const timeDuration = calculateTimeDuration(moment.utc(data.lastCalibrationDate).format('YYYY-MM-DD'), getCurrentDate());
	
	console.log(timeDuration);

	return `<div class="toast-header mt-3" style="background-color:#F0F0F0;">
			<a href="${link}">
				<i class="fas fa-2x fa-certificate" 
					style="color:${moment.utc(data.dueCalibrationDate).unix() > unixTimestamp ? "green" : "red"}; margin-right:10px;">
				</i>
			</a>
			<strong style="font-size:18px;" id="certificate-name" class="me-auto">${certificateName}</strong>
			<small style="color: blue;">Calibrated ${timeDuration.years} years, ${timeDuration.years} months, ${timeDuration.days} days ago</small>
			<button type="button" class="btn-close" data-bs-dismiss="toast"></button>			
		</div>
		<div class="toast-body">
			<p><span>Calibration Location:</span>&nbsp<span style="font-weight:bold;">${location}</span></p>
			<p><span>Last Calibrtion Date:</span>&nbsp<span style="font-weight:bold;">${moment.utc(data.lastCalibrationDate).format('dddd, MM/DD/YYYY')}</span></p>
			<p><span>Due Calibration Date:</span>&nbsp<span style="font-weight:bold;">${moment.utc(data.dueCalibrationDate).format('dddd, MM/DD/YYYY')}</span></p>
			<p><span>Extended?</span>&nbsp<span style="font-weight:bold;">${data.calibrationExtended ? 'YES' : 'NO'}</span></p>
			<p><span>Expired?</span>&nbsp<span style="font-weight:bold;">${moment.utc(data.dueCalibrationDate).unix()>unixTimestamp? "NO" : "YES"}</span></p>
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
		toastItem.classList.add("w-50");
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