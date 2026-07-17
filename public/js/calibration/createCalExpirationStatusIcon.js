const createCalExpirationStatusIcon = function (dueCalibrationDate, activeCalibration, calibrationExtended) {

	//create table cell element
    const cell = document.createElement("td");
    const unixTimestamp = moment().unix();
    const dueCalDate = moment.utc(dueCalibrationDate).unix();
    let iconHtmlText = '';

    if (!activeCalibration) {
        iconHtmlText = '<i style="color:grey;" class="ms-2 fa-solid fa-ban"></i>';
    } else if (unixTimestamp > dueCalDate) {
        iconHtmlText = '<i style="color:red;" class="ms-2 fa-duotone fa-solid fa-bell"></i>';
    } else if (calibrationExtended === false) {
        iconHtmlText = '<i style="color:lightgreen;" class="ms-2 fa-regular fa-circle-check"></i>';
    } else {
        iconHtmlText = '<i style="color:orange;" class="ms-2 fa-regular fa-circle-check"></i>';
    }

    cell.innerHTML = iconHtmlText;


	return cell;


}
