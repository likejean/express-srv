//called in createGearIcon.js.....
//this function displays all information associated with selected sensor

function showSensorInfoCard(
    tableRowIndex,
    description,
    manufacturer,
    quantity,    
    EID,
    model,
    type,
    capacity,
    location,
    comment,
	sensorId
) {
	var deleteBtn = document.getElementById("delete-sensor-button");

    var tableRow;

	//Filters calibrations and datasets associated with a selected sensor (from global storage)
	var associatedCalibrations = _store.calibrations.data.payload.filter(item => item.sensorId === sensorId);
	var associatedDatasets = _store.datasets.data.payload.filter(item => item.sensorId === sensorId);

	

	//construct .href value (url w/ query string containing sensor id) for "UPDATE" button
	const fetchEditSensorButton = document.getElementById("fetch-patch-sensor-info");
	fetchEditSensorButton.href = `./html/editSensor.html?id=${sensorId}`;

	//construct .href value (url w/ query string containing sensor id) for "UPDATE" button
	const createNewDatasetButton = document.getElementById("create-new-sensor-dataset");
	createNewDatasetButton.href = `./html/createNewDataset.html?id=${sensorId}`;

    //Updates html .src attribute to display sensor image
    updateSensorImage(EID);

    //this function utilizes document.getElementById() method to collect references to HTML DOM elements w/ specified IDs
	//removeAllChildNodes() and addTextNodeToHtmlElement() methods mutate these HTML elements in collection folder
    //these HTML elements are dynamically updated w/ respect of _store.sensorTableActiveRowObject active/inactive status
    getHtmlElementsById();

	//////////////////USER CHECKS/////////////////////////////
  	//Check if any 'active' table rows left over from previous click/touch events
    for (const [key, value] of Object.entries(_store.sensorTableActiveRowObject)) {
        
		//deactivate any different tables rows and hide info card (if it's still displayed)
		if (value === "active" && key !== `row${tableRowIndex}`) {
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


	//TOGGLE FUNCTION//
	//activates the current table row [tableRowIndex] and displays associated info card for selected sensor...
    if (_store.sensorTableActiveRowObject[`row${tableRowIndex}`] === "inactive") {
		_store.sensorTableActiveRowObject[`row${tableRowIndex}`] = "active";
		tableRow = document.getElementById(`row${tableRowIndex}`);
		tableRow.classList.add("table-active");
		_store.activeSensorCard = {description, tableRowIndex, EID, sensorId}
		htmlElementCollection.card.style.visibility = "visible";
		
		addTextNodeToHtmlElement(description + "\u00a0" + EID, htmlElementCollection.descriptionHeaderHtml);
		addTextNodeToHtmlElement("NOTE:\u00a0" + comment, htmlElementCollection.sensorCommentHtml);
		addTextNodeToHtmlElement("Manufacturer:\u00a0" + manufacturer, htmlElementCollection.manufacturerNameHtml);
		addTextNodeToHtmlElement("Sensor Model:" + "\u00a0" + model, htmlElementCollection.sensorModelHtml);
		addTextNodeToHtmlElement("Sensor Type:" + "\u00a0" + type, htmlElementCollection.sensorTypeHtml);
		addTextNodeToHtmlElement("Measurement Quantity:" + "\u00a0" + quantity, htmlElementCollection.sensorMeasurementQuantityHtml);
		addTextNodeToHtmlElement("Sensor Capacity Range:" + "\u00a0" + capacity, htmlElementCollection.sensorCapacityRangeHtml);

		if(associatedDatasets.length > 0) createSensorDatasetsChart(associatedDatasets);

		associatedCalibrations.length === 0
			? addHtmlChildElementToParent(htmlElementCollection.calRecordsNoticeHtml,
				`<span class='badge bg-danger'>No Records Found</span>`)
			: addHtmlChildElementToParent(htmlElementCollection.calRecordsNoticeHtml,
				associatedCalibrations.length === 1 
				? `<span class='badge bg-info'>1 Record Found</span>`
				:`<span class='badge bg-info'>${associatedCalibrations.length} Records Found</span>`);

		if (associatedCalibrations.length > 0) {
			if (!deleteBtn.disabled) deleteBtn.disabled = true;
			//createCalListItem.js
			createCalibrationListItem(associatedCalibrations, location, htmlElementCollection.certificateListHtmL);
		}			
		else {
			deleteBtn.disabled = false;
		}

    //deactive a current table row [tableRowIndex] and hide its info card
    //(only if it was activated during previous click event)
    } else {
        _store.sensorTableActiveRowObject[`row${tableRowIndex}`] = "inactive";
        tableRow = document.getElementById(`row${tableRowIndex}`);
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
