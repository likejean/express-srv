function filterSensorsByDescription() {

    console.log("button clicked!");
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
}