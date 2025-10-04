//creates a gear icon to access sensor details and settings (update, delete)
//this function is called in createMainSensorTable 
function createGearIcon(idx, sensor) {
	//creates a table cell with a gear icon
    const cell = document.createElement("td");  
    cell.innerHTML = `<i id="icon${idx}" onClick="showSensorInfoCard(
        ${idx},
        '${sensor.description}',
        '${sensor.manufacturer}',
        '${sensor.quantity}',
        '${sensor.EID}',
        '${sensor.model}',
        '${sensor.type}',
        '${sensor.capacityRange}',
        '${sensor.location}',
        '${sensor.comment}',
		'${sensor._id}',
        )" class='fa-sharp-duotone fa-solid fa-gear'></i>`;
    return cell;
}
