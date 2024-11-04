//creates a dropdown button to list calibrations associated with current procedure
function createDropDownList(tag, calibrations, attrArr) {
	const cell = document.createElement(tag);
	//add any html attributes (if any)
	if (attrArr.length > 0) {
        attrArr.forEach((item) => {
            cell.setAttribute(item.attribute, item.value); 
        });
    }
	//dynamically generate list items for dropdown list
	let str = "";
	for (let i = 0; i < calibrations.length; i++)  {
		str += `<li><a href="../html/editCalibrationEvent.html?id=${calibrations[i]._id}" class="dropdown-item">${calibrations[i].calibrationName}</a></li>`
	}
	//insert generated string for inner html content (dropdown list or span)
    calibrations.length === 0 
		? cell.innerHTML = `<span class="badge rounded-pill text-bg-info text-uppercase">none</span>` 
		: cell.innerHTML = 
			`<div class="dropdown">
				<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
					Calibrations
				</button>
				<ul class="dropdown-menu">${str}</ul>
			</div>`;
    return cell;
    
}
