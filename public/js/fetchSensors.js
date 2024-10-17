const sensorTable = document.querySelector('.data-result');
const notification = document.querySelector('.notification');
const tableBody = document.createElement("tbody");
var tableRowObj = {};



const fetchSensors = async () => {
    try {

    let strJSON;
    // fetch data using POST API endpoint: /api/sensors        
    const { data } = await axios.get('/api/sensors');   
    
    
    // creating all table cells
    for (let i = 0; i < data.sensors.length; i++) { 
        // adds the row of cells to the end of the table body 
        let row = document.createElement("tr");
        strJSON = JSON.stringify(data.sensors[i].calibrations).replace(/\"/g, "&");
        row.setAttribute('id', `row${i+1}`);
        tableRowObj[`row${i+1}`] = `inactive`;
        row.appendChild(createTableCell(`${i+1}`,[]));
        row.appendChild(createTableCell(`${data.sensors[i].EID}`,[]),[]);
        row.appendChild(createTableCell(`${data.sensors[i].description}`,[]));
        row.appendChild(createTableCell(`${data.sensors[i].capacityRange}`,["d-none", "d-sm-table-cell"]));
        row.appendChild(mapCalDueDatesAndBuildTableCell(data.sensors[i]));
        row.appendChild(createGearIcon(i+1, data.sensors[i], strJSON));         
        tableBody.appendChild(row);
    }
    //creates a table cell
    function createTableCell(text, classArr){                    
        const cell = document.createElement("td");
        if (classArr.length > 0) {
            classArr.forEach((item) => {
                cell.classList.add(item); 
            });
        }                
        const cellText = document.createTextNode(text);
        cell.appendChild(cellText);          
        return cell;
    }

    

    //creates a gear icon to access sensor details and settings (update, delete)   
    function createGearIcon(idx, sensor, objstr){ 
        const cell = document.createElement("td"); 
        cell.innerHTML =
        `<i id="icon${idx}" onClick="showSensorInfoCard(
        ${idx},
        '${sensor.description}',
        '${sensor.manufacturer}',
        '${sensor.quantity}',
        '${objstr}',
        '${sensor.EID}',
        '${sensor.model}',
        '${sensor.type}',
        '${sensor.capacityRange}',
        '${sensor.location}'
        )" class='fa-sharp-duotone fa-solid fa-gear'></i>`;        
        return cell;
    }

    
    sensorTable.appendChild(tableBody);      
    } catch (error) {
        notification.innerHTML = `<div class="alert alert-danger" role="alert">NOTE! No sensor data exists or unable to fetch due to system failure.</div>`;
    }
};

fetchSensors();
