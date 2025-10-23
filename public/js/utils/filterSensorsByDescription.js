function filterSensorsByDescription() {
	// This function is used to filter the sensors in the main sensor table by their description.
	// It creates a dropdown menu with the available sensor descriptions and allows the user to filter the table based on their selection.
	const sensorDescriptionTableHeader = document.getElementById("sensorDescriptionTableHeader");
	const textNode = sensorDescriptionTableHeader.firstChild;
	sensorDescriptionTableHeader.removeAttribute("onclick");
	sensorDescriptionTableHeader.removeAttribute("scope");
	sensorDescriptionTableHeader.removeChild(textNode);
	sensorDescriptionTableHeader.style.padding = "2px";

	const select = document.createElement("select");
	select.style.width = "100%";
	select.style.height = "40px";
	select.style.background = "#f4f5f2";

	//get all sensor descriptions from the store and add them to the dropdown menu
	["All", ..._store.getSensorDescriptionList(), "Clear Filter"].forEach(
		(description) => {
		const option = document.createElement("option");
		if (description === "Clear Filter") {
			option.style.color = "red";
			option.style.fontWeight = "bold";
		}
		option.value = description;
		option.text = description;
		select.appendChild(option);
		}
	);

	var tableBody = document.getElementsByTagName("tbody");
	for (const [key, value] of Object.entries(_store.sensorTableActiveRowObject)) {
		if (value === "active") {
			_store.sensorTableActiveRowObject[`${key}`] = "inactive";
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
			removeAllChildNodes(htmlElementCollection.sensorChartHtml);
		}
	}

	//filter Sensor Table based on description
	select.addEventListener("change", (e) => {
		const optionSelected = e.target.value;

		//Display all sensors in the table
		if (optionSelected === "All") {
			for (const [key, value] of Object.entries(
				_store.sensorTableActiveRowObject
			)) {
				//deactivate any different tables rows and hide info card (if it's still displayed)
				if (value === "active") {
				_store.sensorTableActiveRowObject[`${key}`] = "inactive";
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
				removeAllChildNodes(htmlElementCollection.sensorChartHtml);
				}
			}

			removeAllChildNodes(tableBody[0]);
			createMainSensorTable(_store.sensors.data.payload, _store.calibrations.data.payload);

			//initialize Main Sensor Table ActiveRow Object
			_store.getSensorTableActiveRowObject(_store.sensors.data.payload.length);
		}
		//Remove filter from the table header and restore all previous html/css elements
		else if (optionSelected === "Clear Filter") {
			for (const [key, value] of Object.entries(_store.sensorTableActiveRowObject)) {
				//deactivate any different tables rows and hide info card (if it's still displayed)
				if (value === "active") {
					_store.sensorTableActiveRowObject[`${key}`] = "inactive";
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
					removeAllChildNodes(htmlElementCollection.sensorChartHtml);
				}
			}

			// Reset the filter
			removeAllChildNodes(sensorDescriptionTableHeader);
			sensorDescriptionTableHeader.appendChild(textNode);
			sensorDescriptionTableHeader.setAttribute("onclick", "filterSensorsByDescription()");
			sensorDescriptionTableHeader.setAttribute("scope", "col");
			sensorDescriptionTableHeader.removeAttribute("style");
			sensorDescriptionTableHeader.style.backgroundColor = "brown";
			removeAllChildNodes(tableBody[0]);
			createMainSensorTable(_store.sensors.data.payload, _store.calibrations.data.payload);

			//initialize Main Sensor Table ActiveRow Object
			_store.getSensorTableActiveRowObject(_store.sensors.data.payload.length);

		//Filter the sensor list with a respect of sensor description
		} 
		else {
			for (const [key, value] of Object.entries(_store.sensorTableActiveRowObject)) {
			//deactivate any different tables rows and hide info card (if it's still displayed)
				if (value === "active") {
					_store.sensorTableActiveRowObject[`${key}`] = "inactive";
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
					removeAllChildNodes(htmlElementCollection.sensorChartHtml);
				}
			}

			removeAllChildNodes(tableBody[0]);
			createMainSensorTable(_store.sensors.data.payload.filter((item) => item.description === e.target.value), _store.calibrations.data.payload);

			//initialize Main Sensor Table ActiveRow Object
			_store.getSensorTableActiveRowObject(_store.sensors.data.payload.filter((item) => item.description === e.target.value).length);
		}
	});

	sensorDescriptionTableHeader.appendChild(select);
}
