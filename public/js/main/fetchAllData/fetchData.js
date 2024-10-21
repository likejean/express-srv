const sensorTable = document.querySelector('.data-result');
const notification = document.querySelector('.notification');
const tableBody = document.createElement("tbody");
var tableRowObj = {};

const fetchSensors = async () => {
    
    let strJSON;
    // fetch data using POST API endpoint: /api/sensors  

    await Promise.all([
        axios.get('/api/sensors'), 
        axios.get('/api/calibrations'),
        axios.get('/api/procedures')
    ])
        .then(([resultSensors, resultCalibrations, resultProcedures]) => {

            const sensors = resultSensors.data.payload;
            const calibrations =  resultCalibrations.data.payload;
            const procedures = resultProcedures.data.payload;
            
            // creating all table cells            
            for (let i = 0; i < sensors.length; i++) { 
                // adds the row of cells to the end of the table body 
                let row = document.createElement("tr");

                //Filter calibraion objects associated with current sensor
                associatedCalibrations = calibrations.filter(item => sensors[i].calibrations.includes(item._id));

                // stringify calibration list 
                strJSON = JSON.stringify(associatedCalibrations).replace(/\"/g, "&");
                
                // create table item
                row.setAttribute('id', `row${i+1}`);
                tableRowObj[`row${i+1}`] = `inactive`;
                row.appendChild(createTableCell(`${i+1}`,[]));
                row.appendChild(createTableCell(`${sensors[i].EID}`,[]),[]);
                row.appendChild(createTableCell(`${sensors[i].description}`,[]));
                row.appendChild(createTableCell(`${sensors[i].capacityRange}`,["d-none", "d-sm-table-cell"]));
                row.appendChild(mapCalDueDatesAndBuildTableCell(sensors[i]));
                row.appendChild(createGearIcon(i+1, sensors[i], strJSON));  
                tableBody.appendChild(row);
            }
            sensorTable.appendChild(tableBody); 
        })
        .catch(err => {
            notification.innerHTML = `<div class="alert alert-danger" role="alert">${err} NOTE! No sensor data exists or unable to fetch due to system failure.</div>`;
        })
       
    };

fetchSensors();


