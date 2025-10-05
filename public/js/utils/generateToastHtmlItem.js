//this function creates toast item for calibration certificate associated with specific sensor

function generateToastHtmlItem (link, certificateName, data, location) {
	//link = link to edit calibration event page with query string containing calibration _id
	//certificateName = name of the calibration certificate (string)
	//data = calibration object containing all the details of the calibration event
	//location = location where the calibration was performed (string)
	
	//Get a current time in unix format
    const unixTimestamp = moment().unix();
	
	//Calculate time duration from last calibration date to current date
	const timeDuration = calculateTimeDuration(moment.utc(data.lastCalibrationDate).format('YYYY-MM-DD'), getCurrentDate());
	const userLevelStatus = window.localStorage.getItem("userLevel");

	//generate inner HTML for each list item (toast component)
	//the link parameter is used to create a link to edit the calibration event
	//the certificateName parameter is used to display the name of the calibration certificate
	//the data parameter is the calibration object containing all the details of the calibration event	
	return `<div class="toast-header mt-3" style="background-color:#F0F0F0;">
		<a href="${link}" style="pointer-events:${userLevelStatus !== "Admin" ? "none;": "auto"};">						
			<i class="fas fa-2x fa-certificate admin-classified" 
				style="color: ${getColorBasedOnDueDate(data)}; 
				margin-right:10px;">
			</i>
		</a>
		<strong style="font-size:13px;" id="certificate-name" class="me-auto d-none d-sm-block">${certificateName}</strong>
		<small class="d-none d-lg-block" style="color: blue; margin-right:10px;">Calibrated ${timeDuration.years} years, ${timeDuration.months} months, ${timeDuration.days} days ago</small>
		<i class="fa fa-2x fa-info-circle" aria-hidden="true" onclick="viewCertificateComment('${data._id}','${data.comment}')"></i>			
	</div>` +
	//toast body containing calibration details
	//the location parameter is used to display the location where the calibration was performed
	`<div class="toast-body">
		<p><span>Sensor Location:</span>&nbsp<span style="font-weight:bold;">${location}</span></p>
		<p><span>Quantity:</span>&nbsp<span style="font-weight:bold;">${data.procedureId.measurementQuantity} [${data.procedureId.units}]</span></p>
		<p><span>Last Calibrtion Date:</span>&nbsp<span style="font-weight:bold;">${moment.utc(data.lastCalibrationDate).format('dddd, MM/DD/YYYY')}</span></p>
		<p><span>Due Calibration Date:</span>&nbsp<span style="color: ${getColorBasedOnDueDate(data)}; font-weight:bold;">${moment.utc(data.dueCalibrationDate).format('dddd, MM/DD/YYYY')}</span></p>
		<p><span>Extended?</span>&nbsp<span style="font-weight:bold;">${data.calibrationExtended ? 'YES' : 'NO'}</span></p>
		<p><span>Expired?</span>&nbsp<span style="font-weight:bold;">${moment.utc(data.dueCalibrationDate).unix()>unixTimestamp? "NO" : "YES"}</span></p>
	</div>`;
}

//this function returns color based on the due date of the calibration record
//green = valid, orange = extended, red = expired
function getColorBasedOnDueDate(data) {
	const unixTimestamp = moment().unix();
	return moment.utc(data.dueCalibrationDate).unix() > unixTimestamp 
		? data.calibrationExtended 
			? "orange" 
			: "green"
		: "red"
}
