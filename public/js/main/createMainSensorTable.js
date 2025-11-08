const sensorTable = document.querySelector(".data-result");
const tableBody = document.createElement("tbody");
const validCalibrationsTotal = document.querySelector(".valid-calibrations-total");
const extendedCalibrationsTotal = document.querySelector(".extended-calibrations-total");
const expiredCalibrationsTotal = document.querySelector(".expired-calibrations-total");
const outOfServiceCalibrationsTotal = document.querySelector(".out-of-service-calibrations-total");

//this function creates the <<<<<<MAIN FUNCTION>>>>>> for sensor table on the main page
//it is the main function to render the sensor table
//it is called to display all sensors, or a filtered/sorted list of sensors
function createMainSensorTable(sensors, calibrations) {     //comes from fetchAllData.js


	//write total number of valid, extended and expired calibrations next to the legend
	validCalibrationsTotal.innerText = `- ${_store.calibrations.data.payload.length - _store.getCalExpiredCount(_store.calibrations.data.payload) - _store.getCalExtendedCount(_store.calibrations.data.payload)}`;
	extendedCalibrationsTotal.innerText = `- ${_store.getCalExtendedCount(_store.calibrations.data.payload)}`;
	expiredCalibrationsTotal.innerText = `- ${_store.getCalExpiredCount(_store.calibrations.data.payload)}`;
    outOfServiceCalibrationsTotal.innerText = `- ${_store.getCalOutOfServiceCount(_store.calibrations.data.payload)}`;

    //create table body for the sensor table
    for (let i = 0; i < sensors.length; i++) {

        // adds the row of cells to the end of the table body
        let row = document.createElement("tr");
        if (sensors[i].calibrationPriority === "Broken") {
            row.classList.add("table-danger");
        }

        //Filter calibration objects associated with current sensor
        let filteredCalibrations = calibrations.filter((item) => sensors[i].calibrations.some(calibration => calibration._id === item._id));
        
        //create each cell and append to the row
        // Set row ID for later reference
        row.setAttribute("id", `row${i + 1}`);
        row.appendChild(createTableCell("th",`${i + 1}`, [], [{attribute:"scope", value:"row"}])); //# column cell
        row.appendChild(createTableCell("td",`${sensors[i].EID}`, [], [])); //EID cell
        row.appendChild(createTableCell("td",`${sensors[i].description}`, [], [])); //Description cell
        row.appendChild(createTableCell("td",`${sensors[i].capacityRange}`, ["d-none", "d-sm-table-cell"], [])); //Sensor Capacity cell
        row.appendChild(mapCalDueDatesAndBuildTableCell(filteredCalibrations, sensors[i]._id, sensors[i].calibrationPriority)); //Calibration Expiry Status cell
        row.appendChild(createGearIcon(i + 1, sensors[i])); //Gear Icon to view Sensor Details Card

        //append each constructed table row to the table body <tb></tb>
        tableBody.appendChild(row);

		
    }
    //append the <tb> body to identified table in index.html
    sensorTable.appendChild(tableBody);
}
