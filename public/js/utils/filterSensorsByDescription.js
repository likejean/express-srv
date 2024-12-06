function filterSensorsByDescription() {
	const sensorDescriptionTableHeader = document.getElementById("sensorDescriptionTableHeader");	
	const textNode = sensorDescriptionTableHeader.firstChild; 
	sensorDescriptionTableHeader.removeAttribute("onclick");
	sensorDescriptionTableHeader.removeAttribute("scope");
	sensorDescriptionTableHeader.removeChild(textNode);
	sensorDescriptionTableHeader.style.padding = "2px";
	
	const select = document.createElement('select');
	select.style.width = "100%";
	select.style.height = "40px";
	select.style.background = "#f4f5f2";
	

	["All", ..._store.getSensorDescriptionList(), "Clear Filter"].forEach((description) => {
		const option = document.createElement('option');
		if (description === "Clear Filter") {
			option.style.color = "red";
			option.style.fontWeight = "bold";			
		}
		option.value = description;
		option.text = description;
		select.appendChild(option);
	})

	var tableBody = document.getElementsByTagName("tbody");
	for (const [key, value] of Object.entries(tableRowObj)) {
		if (value === "active") {
			tableRowObj[`${key}`] = "inactive";
			let tableRow = document.getElementById(key);
			tableRow.classList.remove("table-active");
			htmlElementCollection.card.style.visibility = "hidden";
			removeAllChildNodes(htmlElementCollection.descriptionHeaderHtml);
			removeAllChildNodes(htmlElementCollection.sensorCommentHtml);
			removeAllChildNodes(htmlElementCollection.manufacturerNameHtml);
			removeAllChildNodes(htmlElementCollection.sensorModelHtml);
			removeAllChildNodes(htmlElementCollection.sensorTypeHtml);
			removeAllChildNodes(htmlElementCollection.sensorMeasurementQuantityHtml);
			removeAllChildNodes(htmlElementCollection.sensorCapacityRangeHtml);
			removeAllChildNodes(htmlElementCollection.calRecordsNoticeHtml);
			removeAllChildNodes(htmlElementCollection.certificateListHtmL);
		}
	}

	console.log(tableRowObj);

	//filter Sensor Table based on description
	select.addEventListener("change", (e) => {
		const optionSelected = e.target.value;

		//Display all sensors in the table
		if (optionSelected === "All") {
			removeAllChildNodes(tableBody[0]);
			createMainSensorTable(
				_store.sensors.data.payload,
				_store.calibrations.data.payload
			);
			
		}
		//Remove filter from the table header and restore all previous html/css elements
		else if (optionSelected === "Clear Filter") {

			console.log('Clear Filter')
			console.log(tableRowObj);

			removeAllChildNodes(sensorDescriptionTableHeader)
			sensorDescriptionTableHeader.appendChild(textNode);
			sensorDescriptionTableHeader.setAttribute("onclick", "filterSensorsByDescription()");		
			sensorDescriptionTableHeader.setAttribute("scope", "col");
			sensorDescriptionTableHeader.removeAttribute("style");
			removeAllChildNodes(tableBody[0]);
			createMainSensorTable(
				_store.sensors.data.payload,
				_store.calibrations.data.payload
			);

			for (const [key, value] of Object.entries(tableRowObj)) {
				//deactivate any different tables rows and hide info card (if it's still displayed)
				if (value === "active" && key !== `row${tableRowIndex}`) {
					tableRowObj[`${key}`] = "inactive";
					tableRow = document.getElementById(key);
					tableRow.classList.remove("table-active");
					htmlElementCollection.card.style.visibility = "hidden";
					removeAllChildNodes(htmlElementCollection.descriptionHeaderHtml);
					removeAllChildNodes(htmlElementCollection.sensorCommentHtml);
					removeAllChildNodes(htmlElementCollection.manufacturerNameHtml);
					removeAllChildNodes(htmlElementCollection.sensorModelHtml);
					removeAllChildNodes(htmlElementCollection.sensorTypeHtml);
					removeAllChildNodes(htmlElementCollection.sensorMeasurementQuantityHtml);
					removeAllChildNodes(htmlElementCollection.sensorCapacityRangeHtml);
					removeAllChildNodes(htmlElementCollection.calRecordsNoticeHtml);
					removeAllChildNodes(htmlElementCollection.certificateListHtmL);
				}
			}
		
		//Filter the sensor list with a respect of sensor description
		}else{
			
			removeAllChildNodes(tableBody[0]);
			createMainSensorTable(
				_store.sensors.data.payload.filter(item => item.description === e.target.value),
				_store.calibrations.data.payload
			);
			for (const [key, value] of Object.entries(tableRowObj)) {
				if (value === "active") {
					tableRowObj[`${key}`] = "inactive";
					
				}
			}
		}
		
	});

	sensorDescriptionTableHeader.appendChild(select);

}