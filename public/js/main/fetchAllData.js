const fetchAllData = async () => {
    
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

             //function call to create all cells for main sensor table    
            createMainSensorTable(sensors, calibrations); 
            
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

fetchAllData();


