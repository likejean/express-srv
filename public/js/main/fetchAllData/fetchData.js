const sensorTable = document.querySelector('.data-result');
const notification = document.querySelector('.notification');
const tableBody = document.createElement("tbody");
var tableRowObj = {};

const fetchSensors = async () => {
    
    let strJSON;
    // fetch all data using POST API endpoints: sensors, calibrations, procedures  
    await Promise.all([
            axios.get('/api/sensors'), 
            axios.get('/api/calibrations'),
            axios.get('/api/procedures')
        ])
        .then(([resultSensors, resultCalibrations, resultProcedures]) => {

            //If successful fetch being executed, retrieve all data
            const sensors = resultSensors.data.payload;
            const calibrations =  resultCalibrations.data.payload;
            const procedures = resultProcedures.data.payload;
            
            // creating all table cells            
            for (let i = 0; i < sensors.length; i++) { 
                // adds the row of cells to the end of the table body 
                let row = document.createElement("tr");

                //Filter calibraion objects associated with current sensor
                let associatedCalibrations = calibrations.filter(item => sensors[i].calibrations.includes(item._id));

                // stringify calibration list 
                strJSON = JSON.stringify(associatedCalibrations).replace(/\"/g, "&");
                
                // create table row for each sensor
                row.setAttribute('id', `row${i+1}`);
                tableRowObj[`row${i+1}`] = `inactive`;
                row.appendChild(createTableCell(`${i+1}`,[]));
                row.appendChild(createTableCell(`${sensors[i].EID}`,[]),[]);
                row.appendChild(createTableCell(`${sensors[i].description}`,[]));
                row.appendChild(createTableCell(`${sensors[i].capacityRange}`,["d-none", "d-sm-table-cell"]));
                row.appendChild(mapCalDueDatesAndBuildTableCell(associatedCalibrations));
                row.appendChild(createGearIcon(i+1, sensors[i], strJSON));  
                //append each constructed table row to the table body <tb></tb>
                tableBody.appendChild(row);
            }
            //append the <tb> body to identified table in index.html
            sensorTable.appendChild(tableBody); 
        })
        .catch(error => {
            //display error message if data fetch failure occurs or any other internal error detected
            notification.innerHTML = `
            <div class="text-center">
                <div class="alert alert-danger" role="alert"> NOTE! No sensor data exists or unable to fetch due to system failure.</div>
                <div class="alert alert-danger" role="alert">${error}</div>
            </div>`;
        })
       
    };

fetchSensors();


