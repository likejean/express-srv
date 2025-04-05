const sensorTable = document.querySelector(".data-result");
const tableBody = document.createElement("tbody");


function createMainSensorTable(sensors, calibrations) {     //comes from fetchAllData.js

    // creating all table cells	
    for (let i = 0; i < sensors.length; i++) {
        // adds the row of cells to the end of the table body
        let row = document.createElement("tr");

        //Filter calibration objects associated with current sensor
        let filteredCalibrations = calibrations.filter((item) => sensors[i].calibrations.some(calibration => calibration._id === item._id));
        
        // create table row for each sensor
        row.setAttribute("id", `row${i + 1}`);
        row.appendChild(createTableCell("th",`${i + 1}`, [], [{attribute:"scope", value:"row"}])); //# column cell
        row.appendChild(createTableCell("td",`${sensors[i].EID}`, [], [])); //EID cell
        row.appendChild(createTableCell("td",`${sensors[i].description}`, [], [])); //Description cell
        row.appendChild(createTableCell("td",`${sensors[i].capacityRange}`, ["d-none", "d-sm-table-cell"], [])); //Sensor Capacity cell
        row.appendChild(mapCalDueDatesAndBuildTableCell(filteredCalibrations)); //Calibration Expiry Status cell
        row.appendChild(createGearIcon(i + 1, sensors[i])); //Gear Icon to view Sensor Details Card

        //append each constructed table row to the table body <tb></tb>
        tableBody.appendChild(row);

		
    }
    //append the <tb> body to identified table in index.html
    sensorTable.appendChild(tableBody);
}
