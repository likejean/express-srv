//creates a trash icon to delete calibration procedure
function createTrashIcon(rowIdx, procedureId, attrArr, disabled) {
	//const disabledStatus = disabled ? `<button class="btn btn-danger" disabled>` : `<button class="btn btn-danger">`
	//if user is admin, disable the trash icon button
	//can be deleted only by another admin manually in the database
	const trashButton = disabled 
	?  `<button class="btn btn-danger" disabled>` 
	:  `<button class="btn btn-danger" data-bs-toggle="modal" 
		data-bs-target="#deleteProcedureRecordModal" 
		onclick="openCalibrationWarningModal('${procedureId}')">`;
	
    const cell = document.createElement("td");  
	if (attrArr.length > 0) {
        attrArr.forEach((item) => {
            cell.setAttribute(item.attribute, item.value); 
        });
    } 
    cell.innerHTML = trashButton + `<i id="icon${rowIdx}"  
        class='fa-sharp-duotone fa-solid fa-trash' style="color:white;"></i></button>`;
    return cell;
}
