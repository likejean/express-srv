function createProceduresTable() {

	const tableBody = document.querySelector(".calibration-procedures-data");
	const data = _store.procedures.data.payload;

	
	for(let i = 0; i < data.length; i++){
		// adds the row of cells to the end of the table body
        let row = document.createElement("tr");
		row.setAttribute("id", `row${i + 1}`);
		row.appendChild(createTableCell("th",`${i + 1}`, [],  [{attribute:"scope", value:"row"}])); //# column cell
		row.appendChild(createTableCell("td",`${data[i].procedureName}`, [],  [])); //Procedure Name cell
		row.appendChild(createTableCell("td",`${data[i].description}`, ["d-none", "d-sm-table-cell"],  [])); //Description cell
		row.appendChild(createTableCell("td",`${data[i].calibratorModel}`, ["d-none", "d-sm-table-cell"],  [])); //Calibrator Model cell
		row.appendChild(createTableCell("td",`${data[i].manufacturer}`, ["d-none", "d-lg-table-cell"],  [])); //Calibrator Manufacturer cell
		row.appendChild(createTableCell("td",`${data[i].measurementQuantity}`, ["d-none", "d-md-table-cell"],  [])); //Measurement Quantity cell
		row.appendChild(createTableCell("td",`${data[i].units}`, ["d-none", "d-md-table-cell"],  [])); //Units cell		
		row.appendChild(createDropDownList("td", data[i].calibrations, [])); //Calibrations drop-down list
		row.appendChild(createCollapseComment("button", data[i].calibrations, data[i].comment)); //Calibrations drop-down list
		//row.appendChild(createTableCell("td", data[i].comment, ["d-none", "d-lg-table-cell"],  [])); //Comments Manufacturer cell
		row.appendChild(createTrashIcon(`${i + 1}`, `${data[i]._id}`, [], data[i].calibrations.length !== 0))

		//append each constructed table row to the table body <tb></tb>
        tableBody.appendChild(row);
	}
}

