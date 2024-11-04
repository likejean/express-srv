//creates a dropdown button to list calibrations associated with current procedure
function createDropDownList(tag, calibrations, attrArr) {
	const cell = document.createElement(tag);
	if (attrArr.length > 0) {
        attrArr.forEach((item) => {
            cell.setAttribute(item.attribute, item.value); 
        });
    }
	let str = "";
	for (let i = 0; i < calibrations.length; i++)  {
		str += `<li><a href="../html/editCalibrationEvent.html?id=${calibrations[i]._id}" class="dropdown-item">${calibrations[i].calibrationName}</a></li>`
	}
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
