const calibrationTable = document.querySelector(".calibrations-data");
const tableBody = document.createElement("tbody");
const calibrationName = document.querySelector(".calibrationName");
const sensorEID = document.querySelector(".sensorEID");
const procedureName = document.querySelector(".procedureName");
const calibrationDueDate = document.querySelector(".calibrationDueDate");
const isCalibrationActive = document.querySelector(".isCalibrationActive");
const isCalibrationExtended = document.querySelector(".isCalibrationExtended");
const isCalibrationExpired = document.querySelector(".isCalibrationExpired");

function createCalibrationTable(calibrations) {

	const sortedCalibrations = _store.sortCalibrationByDate(calibrations);

	//create table body for the calibration table
    for (let i = 0; i < sortedCalibrations.length; i++) {

		// adds the row of cells to the end of the table body
        let row = document.createElement("tr");
        
        // create each cell and append to the row
		// function createTableCell(tag, text, classArr, attrArr)
    
        row.setAttribute("id", `row${i + 1}`);  // Set row ID for later reference
        row.appendChild(createTableCell("th",`${i + 1}`, [], [{attribute:"scope", value:"row"}])); //# column cell
        row.appendChild(createTableCell("td",`${sortedCalibrations[i].calibrationName}`, [], [], `../html/editCalibrationEvent.html?id=${sortedCalibrations[i]._id}`)); //Calibration Name Cell
        row.appendChild(createTableCell("td",`${sortedCalibrations[i].sensorId.EID}`, [], [{attribute:"style", value:"font-weight: bold;"}], `../html/editSensor.html?id=${sortedCalibrations[i].sensorId._id}`)); //Sensor EID cell
		row.appendChild(createTableCell("td",`${sortedCalibrations[i].procedureId.procedureName}`, ["d-none", "d-sm-table-cell"], [], `../html/editProcedure.html?id=${sortedCalibrations[i].procedureId._id}`)); //Procedure Name Cell
        row.appendChild(createTableCell("td",`${moment(sortedCalibrations[i].dueCalibrationDate).format("MM-DD-YYYY")}`, ["d-none", "d-sm-table-cell"], [])); //Sensor Capacity cell
		row.appendChild(createTableCell("td",`${sortedCalibrations[i].activeCalibration ? "Yes" : "Out of Service"}`, ["d-none", "d-sm-table-cell"], [])); //Active Calibration Status cell
		row.appendChild(createTableCell("td",`${sortedCalibrations[i].calibrationExtended ? "Yes" : "No"}`, ["d-none", "d-sm-table-cell"], [])); //Extended Calibration Status cell
		row.appendChild(createCalExpirationStatusIcon(sortedCalibrations[i].dueCalibrationDate, sortedCalibrations[i].activeCalibration, sortedCalibrations[i].calibrationExtended)); //Expired Calibration Status cell
        

        //append each constructed table row to the table body <tb></tb>
        tableBody.appendChild(row);
    }
    //append the <tb> body to identified table in viewCalibration.html file
    calibrationTable.appendChild(tableBody);

}