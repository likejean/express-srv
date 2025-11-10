const createCalExpirationStatusIcon = function (dueCalibrationDate, activeCalibration, calibrationExtended) {

	//create table cell element
    const cell = document.createElement("td");
    const unixTimestamp = moment().unix();
    dueCalDate = moment.utc(dueCalibrationDate).unix();
	iconHtmlText = unixTimestamp > dueCalDate
		? activeCalibration 
			? 
			'<i style="color:red;" class="ms-2 fa-duotone fa-solid fa-bell" /i>'
			:
			'<i style="color:grey;" class="ms-2 fa-ban fa-solid fa-grey" /i>'
		: calibrationExtended === false
			?
			'<i style="color:lightgreen;" class="ms-2 fa-regular fa-circle-check" /i>'
			:
			'<i style="color:orange;" class="ms-2 fa-regular fa-circle-check" /i>'
	cell.innerHTML += iconHtmlText;


	return cell;


}
