//creates a trash icon to delete calibration procedure
function createTrashIcon(rowIdx, procedureId, attrArr, disabled) {
	const disabledStatus = disabled ? `<button class="btn btn-danger" disabled>` : `<button class="btn btn-danger">`
    const cell = document.createElement("td");  
	if (attrArr.length > 0) {
        attrArr.forEach((item) => {
            cell.setAttribute(item.attribute, item.value); 
        });
    } 
    cell.innerHTML = disabledStatus + `<i id="icon${rowIdx}" onClick="deleteCalibrationProcedure(
        ${rowIdx},
		'${procedureId}',
        )" class='fa-sharp-duotone fa-solid fa-trash' style="color:white;"></i></button>`;
    return cell;
}
