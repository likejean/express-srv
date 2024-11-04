function createProceduresTable() {
	const tableBody = document.querySelector(".calibration-procedures-data");
	const data = _store.procedures.data.payload;

	
	for(let i = 0; i < data.length; i++){
		// adds the row of cells to the end of the table body
        let row = document.createElement("tr");

		row.setAttribute("id", `row${i + 1}`);

		row.appendChild(createTableCell("th",`${i + 1}`, [])); //# column cell
		row.appendChild(createTableCell("td",`${data[i].procedureName}`, []), []); //Procedure Name cell
		row.appendChild(createTableCell("td",`${data[i].description}`, []), []); //Description cell
		row.appendChild(createTableCell("td",`${data[i].calibratorModel}`, []), []); //Calibrator Model cell
		row.appendChild(createTableCell("td",`${data[i].measurementQuantity}`, []), []); //Measurement Quantity cell
		row.appendChild(createTableCell("td",`${data[i].units}`, []), []); //Units cell
		row.appendChild(createTableCell("td",`${data[i].manufacturer}`, []), []); //Calibrator Manufacturer cell
		row.appendChild(createTableCell("td",`calibrations`, []), []); //Calibrations cell
		row.appendChild(createTableCell("td",`comments`, []), []); //Comments Manufacturer cell
		row.appendChild(createTrashIcon(`${i + 1}`, `${data[i]._id}`, data[i].calibrations.length === 0))

		//append each constructed table row to the table body <tb></tb>
        tableBody.appendChild(row);
	}
}

