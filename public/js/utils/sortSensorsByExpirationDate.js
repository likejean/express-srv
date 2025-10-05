function sortSensorsByExpirationDate() {

	//this function sorts sensors by their expiration date (dueCalibrationDate)
	//sensors with the nearest expiration date will be listed first in the table
    var tableBody = document.getElementsByTagName("tbody");	

	//this for loop deactivates any active table row and hides the sensor info card (if it's still displayed)
	for (const [key, value] of Object.entries(_store.sensorTableActiveRowObject)) {
		
		//deactivate any different tables rows and hide sensor info card (if it's still displayed)		
		//this if statement ensures that only one table row is active at a time
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

	//remove the initial table body (sensor list)
	removeAllChildNodes(tableBody[0]);

	//generate a new table body (sensor list) sorted by last calibration date
	createMainSensorTable(_store.sortSensorsByDate(), _store.calibrations.data.payload);

	//initialize Main Sensor Table ActiveRow Object
	_store.getSensorTableActiveRowObject(_store.sensors.data.payload.length);

}