//creates a gear icon to access sensor details and settings (update, delete)
function createGearIcon(idx, sensor, objstr) {
    const cell = document.createElement("td");  
    cell.innerHTML = `<i id="icon${idx}" onClick="showSensorInfoCard(
        ${idx},
        '${sensor.description}',
        '${sensor.manufacturer}',
        '${sensor.quantity}',
        '${objstr}',                   
        '${sensor.EID}',
        '${sensor.model}',
        '${sensor.type}',
        '${sensor.capacityRange}',
        '${sensor.location}',
        '${sensor.comment}',
        )" class='fa-sharp-duotone fa-solid fa-gear'></i>`;
    return cell;
}
