//called in createGearIcon.js
function showSensorInfoCard(
    tableRowIndex,
    description,
    manufacturer,
    quantity,
    calibrations, //should get array from createGearIcon
    EID,
    model,
    type,
    capacity,
    location,
    comment,
	sensorId
) {
	var parsedJSON = JSON.parse(calibrations.replace(/\&/g, '"'));
	var deleteBtn = document.getElementById("delete-sensor-button");

    var tableRow;

	//construct .href value (url w/ query string containing sensor id) for "UPDATE" button
	const fetchEditSensorButton = document.getElementById("fetch-patch-sensor-info");
	fetchEditSensorButton.href = `./html/editSensor.html?id=${sensorId}`;

    //Updates html .src attribute to display sensor image
    updateSensorImage(EID);

    //this function call runs document.getElementById() method and mutates globally available object in collection folder; this object stores all
    //dynamically updated card information html elements in tableRowIndex.html
    getHtmlElementsById();

  //CHECK//
  //Check if any 'active' table rows left over from previous click/touch events
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


	//TOGGLE FUNCTION//
	//activates the current table row [tableRowIndex] and displays associated info card for selected sensor...
    if (tableRowObj[`row${tableRowIndex}`] === "inactive") {
		tableRowObj[`row${tableRowIndex}`] = "active";
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

		parsedJSON.length === 0
			? addHtmlChildElementToParent(htmlElementCollection.calRecordsNoticeHtml,
				`<span class='badge bg-danger'>No Records Found</span>`)
			: addHtmlChildElementToParent(htmlElementCollection.calRecordsNoticeHtml,
				parsedJSON.length === 1 
				? `<span class='badge bg-info'>1 Record Found</span>`
				:`<span class='badge bg-info'>${parsedJSON.length} Records Found</span>`);

		if (parsedJSON.length > 0) {
			if (!deleteBtn.disabled) deleteBtn.disabled = true;
			//createCalListItem.js
			createCalibrationListItem(parsedJSON, location, htmlElementCollection.certificateListHtmL);
		}			
		else {
			deleteBtn.disabled = false;
		}

    //deactive a current table row [tableRowIndex] and hide its info card
    //(only if it was activated during previous click event)
    } else {
        tableRowObj[`row${tableRowIndex}`] = "inactive";
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
    }
}
