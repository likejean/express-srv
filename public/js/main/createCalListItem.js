//this function creates list of all calibrations associated with specified sensor

function generateToastHtmlItem (link, certificateName, data, location) {
	//Get a current time in unix format
    const unixTimestamp = moment().unix();
	//Calculate time duration from last calibration date to current date
	const timeDuration = calculateTimeDuration(moment.utc(data.lastCalibrationDate).format('YYYY-MM-DD'), getCurrentDate());
	const userLevelStatus = window.localStorage.getItem("userLevel");

	return `<div class="toast-header mt-3" style="background-color:#F0F0F0;">
			<a href="${link}" style="pointer-events:${userLevelStatus !== "Admin" ? "none;": "auto"};">						
				<i class="fas fa-2x fa-certificate admin-classified" 
					style="color:${moment.utc(data.dueCalibrationDate).unix() > unixTimestamp ? "green" : "red"}; margin-right:10px;">
				</i>
			</a>
			<strong style="font-size:13px;" id="certificate-name" class="me-auto d-none d-sm-block">${certificateName}</strong>
			<small class="d-none d-lg-block" style="color: blue; margin-right:10px;">Calibrated ${timeDuration.years} years, ${timeDuration.months} months, ${timeDuration.days} days ago</small>
			<i class="fa fa-2x fa-info-circle" aria-hidden="true" onclick="viewCertificateComment('${data._id}','${data.comment}')"></i>			
		</div>
		<div class="toast-body">
			<p><span>Sensor Location:</span>&nbsp<span style="font-weight:bold;">${location}</span></p>
			<p><span>Last Calibrtion Date:</span>&nbsp<span style="font-weight:bold;">${moment.utc(data.lastCalibrationDate).format('dddd, MM/DD/YYYY')}</span></p>
			<p><span>Due Calibration Date:</span>&nbsp<span style="font-weight:bold;">${moment.utc(data.dueCalibrationDate).format('dddd, MM/DD/YYYY')}</span></p>
			<p><span>Extended?</span>&nbsp<span style="font-weight:bold;">${data.calibrationExtended ? 'YES' : 'NO'}</span></p>
			<p><span>Expired?</span>&nbsp<span style="font-weight:bold;">${moment.utc(data.dueCalibrationDate).unix()>unixTimestamp? "NO" : "YES"}</span></p>
		</div>`;
}



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