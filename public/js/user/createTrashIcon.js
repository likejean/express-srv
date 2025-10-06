//creates a trash icon to delete user record
function createTrashIcon(rowIdx, userId, attrArr, isUserAdmin) {
	
	//if user is admin, disable the trash icon button
	//can be deleted only by another admin manually in the database
	const trashButton = isUserAdmin 
	? `<button class="btn btn-danger" disabled>` 
	: `<button class="btn btn-danger" data-bs-toggle="modal" 
		data-bs-target="#deleteUserRecordModal" 
		onclick="openUserWarningModal('${userId}')">`;

	//create table cell element
    const cell = document.createElement("td");  
	if (attrArr.length > 0) {
        attrArr.forEach((item) => {
            cell.setAttribute(item.attribute, item.value); 
        });
    } 

	//set inner HTML of the cell element
    cell.innerHTML = trashButton + `<i id="icon${rowIdx}"  
        class='fa-sharp-duotone fa-solid fa-trash' style="color:white;"></i></button>`;	
    return cell;
}
