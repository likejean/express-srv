function createProceduresTable() {

	const tableBody = document.querySelector(".calibration-procedures-data");
	const data = _store.procedures.data.payload;

	
	for(let i = 0; i < data.length; i++){
		// adds the row of cells to the end of the table body
        let row = document.createElement("tr");

		//append rows to the table body
		row.setAttribute("id", `row${i + 1}`);

		// Create and append each cell to the row
		// The first cell is a header cell with the row number
		// The rest of the cells are data cells with the procedure information
		row.appendChild(createTableCell("th",`${i + 1}`, [],  [{attribute:"scope", value:"row"}])); //# column cell
		row.appendChild(createTableCell("td",`${data[i].procedureName}`, [],  [{attribute:"id", value: `name_${i + 1}`}])); //Procedure Name cell
		row.appendChild(createTableCell("td",`${data[i].description}`, ["d-none", "d-lg-table-cell"],  [{attribute:"id", value: `description_${i + 1}`}])); //Description cell
		row.appendChild(createTableCell("td",`${data[i].calibratorModel}`, ["d-none", "d-sm-table-cell"],  [{attribute:"id", value: `model_${i + 1}`}])); //Calibrator Model cell
		row.appendChild(createTableCell("td",`${data[i].manufacturer}`, ["d-none", "d-lg-table-cell"],  [{attribute:"id", value: `manufacturer_${i + 1}`}])); //Calibrator Manufacturer cell
		row.appendChild(createTableCell("td",`${data[i].measurementQuantity}`, ["d-none", "d-md-table-cell"],  [{attribute:"id", value: `quantity_${i + 1}`}])); //Measurement Quantity cell
		row.appendChild(createTableCell("td",`${data[i].units}`, ["d-none", "d-md-table-cell"],  [{attribute:"id", value: `units_${i + 1}`}])); //Units cell		
		row.appendChild(createDropDownList("td", data[i].calibrations, [])); //Calibrations drop-down list
		row.appendChild(createCollapseComment("td", i + 1, data[i].comment)); //Comments Manufacturer cell
		row.appendChild(createTrashIcon(`${i + 1}`, `${data[i]._id}`, [], data[i].calibrations.length !== 0))

		//append each constructed table row to the table body <tb></tb>
        tableBody.appendChild(row);
	}
}

