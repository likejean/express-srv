function createUsersTable() {

	const tableBody = document.querySelector(".user-records-data");
	const data = _store.users.data.payload;

	for(let i = 0; i < data.length; i++){

		// adds the row of cells to the end of the table body
        let row = document.createElement("tr");

		row.setAttribute("id", `row${i + 1}`);		
		row.appendChild(createTableCell("th",`${i + 1}`, [],  [{attribute:"scope", value:"row"}])); //# column cell
		row.appendChild(createAvatarThumbnail(
			"td", 
			data[i].avatarImageData.data, 
			["img-thumbnail", "m-1"],  
			[
				{attribute:"src", value:"#"},
				{attribute:"alt", value:"image_undefined"},
				{attribute:"onclick", value: `navigateUserProfile(${JSON.stringify(data[i]._id)})`}	
			]
		)); //# avatar cell
		
		row.appendChild(createTableCell("td",`${data[i].firstname + ' ' + data[i].lastname}`, ["d-none", "d-sm-table-cell"],  [])); //user first and last name cell
		row.appendChild(createTableCell("td",`${data[i].username}`, [],  [])); //username cell
		row.appendChild(createTableCell("td",`${data[i].email}`, [],  [])); //email cell
		row.appendChild(createTableCell("td",`${data[i].age}`, ["d-none", "d-sm-table-cell"],  [])); //age cell
		row.appendChild(createTableCell("td",`${data[i].aboutYourself}`, ["d-none", "d-sm-table-cell"],  [])); //abourYourself cell
		row.appendChild(createTrashIcon(`${i + 1}`, `${data[i]._id}`, [], data[i].level === "Admin"? true : false));

		//append each constructed table row to the table body <tb></tb>
        tableBody.appendChild(row);
        
	}
}