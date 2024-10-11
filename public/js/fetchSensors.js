
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
        
        console.log(typeof(data.sensors[i].expirationDate))
        console.log(data.sensors[i].expirationDate)
        const row = document.createElement("tr");
        row.setAttribute('id', `row${i+1}`);
        rowObj[`row${i+1}`] = `inactive`;
        row.appendChild(createTableCell(`${i+1}`));
        row.appendChild(createTableCell(`${data.sensors[i].EID}`));
        row.appendChild(createTableCell(`${data.sensors[i].description}`));
        row.appendChild(createTableCell(`${data.sensors[i].calibrationRange}`));
        row.appendChild(createIcon(i+1, data.sensors[i]));            
        tableBody.appendChild(row);
    }
    //creates a table cell
    function createTableCell(text){                    
        const cell = document.createElement("td");         
        const cellText = document.createTextNode(text);
        cell.appendChild(cellText);          
        return cell;
    }
    //creates a gear icon to access sensor details and settings (update, delete)
   
    function createIcon(idx, sensor){ 
        const cell = document.createElement("td"); 
        cell.innerHTML =
        `<i id="icon${idx}" onClick="showSensorDetailsAndSettings(
        ${idx},
        '${sensor.description}',
        '${sensor.manufacturer}',
        '${sensor.units}',
        '${sensor.expirationDate}',
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
