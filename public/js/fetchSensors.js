
const sensorTable = document.querySelector('.data-result');
const notification = document.querySelector('.notification');
const tableBody = document.createElement("tbody");
var rowObj = {};


const fetchSensors = async () => {
    try {
    // fetch data using POST API endpoint: /api/sensors        
    const { data } = await axios.get('/api/sensors'); 
    
    // creating all table cells
    for (let i = 0; i < data.sensors.length; i++) {       
        // adds the row of cells to the end of the table body 
        
        const row = document.createElement("tr");
        row.setAttribute('id', `row${i+1}`);
        rowObj[`row${i+1}`] = `inactive`;
        row.appendChild(createTableCell(`${i+1}`));
        row.appendChild(createTableCell(`${data.sensors[i].EID}`));
        row.appendChild(createTableCell(`${data.sensors[i].description}`));
        row.appendChild(createTableCell(`${data.sensors[i].capacityRange}`));
        row.appendChild(createExpiryIcon(`${data.sensors[i].dueCalibrationDate}`));
        row.appendChild(createGearIcon(i+1, data.sensors[i]));         
        tableBody.appendChild(row);
    }
    //creates a table cell
    function createTableCell(text){                    
        const cell = document.createElement("td");         
        const cellText = document.createTextNode(text);
        cell.appendChild(cellText);          
        return cell;
    }


    //creates a calender and bell icon depending if a sensor calibration due date is expired
    function createExpiryIcon(dueCalibrationDate){
        //let expired;
        const cell = document.createElement("td"); 
        let dueCalDate = moment.utc(dueCalibrationDate).unix();
        unixTimestamp = moment().unix();
        let expired = unixTimestamp > dueCalDate 
        ? 'style="color:red" class="ms-2 fa-duotone fa-solid fa-bell"'
        : 'style="color:lightgreen" class="ms-2 fa-regular fa-circle-check"';
        cell.innerHTML = 
        `<i class="fa-duotone fa-solid fa-calendar-check"></i>        
        <i ` + expired + ` </i>`;        
        return cell;

    }

    //creates a gear icon to access sensor details and settings (update, delete)   
    function createGearIcon(idx, sensor){ 
        const cell = document.createElement("td"); 
        cell.innerHTML =
        `<i id="icon${idx}" onClick="showSensorDetailsAndSettings(
        ${idx},
        '${sensor.description}',
        '${sensor.manufacturer}',
        '${sensor.units}',
        '${sensor.lastCalibrationDate}',
        '${sensor.dueCalibrationDate}',
        '${sensor.EID}'
        )" class='fa-sharp-duotone fa-solid fa-gear'></i>`;        
        return cell;
    }

    
    sensorTable.appendChild(tableBody);      
    } catch (error) {
        notification.innerHTML = `<div class="alert alert-danger" role="alert">NOTE! No sensor data exists or unable to fetch due to system failure.</div>`;
    }
};

fetchSensors();
