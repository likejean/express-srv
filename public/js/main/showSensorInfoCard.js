function showSensorInfoCard(
    index,
    description,
    manufacturer,
    quantity,
    calibrations, //should get array from createGearIcon
    EID,
    model,
    type,
    capacity,
    location,
    comment
) {
    var parsedJSON = JSON.parse(calibrations.replace(/\&/g, '"'));

    var tableRow;

    //Updates html .src attribute to display sensor image
    updateSensorImage(EID);

    //this function call runs document.getElementById() method and mutates globally available object in collection folder; this object stores all
    //dynamically updated card information html elements in index.html
    getHtmlElementsById();

  //CHECK//
  //Check if any 'active' table rows left over from previous click/touch events
    for (const [key, value] of Object.entries(tableRowObj)) {
        //deactivate any different tables rows and hide info card (if it's still displayed)
        if (value === "active" && key !== `row${index}`) {
        tableRowObj[`${key}`] = "inactive";
        tableRow = document.getElementById(key);
        tableRow.classList.remove("table-active");
        htmlElementCollection.card.style.visibility = "hidden";
        removeAllChildNodes(htmlElementCollection.descriptionHeaderHtml);
        removeAllChildNodes(htmlElementCollection.sensorCommentHtml);
        removeAllChildNodes(htmlElementCollection.manufacturerNameHtml);
        removeAllChildNodes(htmlElementCollection.calProcedureInfoHtml);
        removeAllChildNodes(htmlElementCollection.calProcedureNameHtml);
        removeAllChildNodes(htmlElementCollection.sensorModelHtml);
        removeAllChildNodes(htmlElementCollection.sensorTypeHtml);
        removeAllChildNodes(htmlElementCollection.sensorMeasurementQuantityHtml);
        removeAllChildNodes(htmlElementCollection.sensorCapacityRangeHtml);
        removeAllChildNodes(htmlElementCollection.calRecordsNoticeHtml);
    }
}

  //TOGGLE FUNCTION//
  //activate a current table row [index] and display its info card...
    if (tableRowObj[`row${index}`] === "inactive") {
    tableRowObj[`row${index}`] = "active";
    tableRow = document.getElementById(`row${index}`);
    tableRow.classList.add("table-active");
    htmlElementCollection.card.style.visibility = "visible";
    addTextNodeToHtmlElement(
        description + "\u00a0" + EID,
        htmlElementCollection.descriptionHeaderHtml
    );
    addTextNodeToHtmlElement(
        "NOTE:\u00a0" + comment,
        htmlElementCollection.sensorCommentHtml
    );
    addTextNodeToHtmlElement(
        "Manufacturer:\u00a0" + manufacturer,
        htmlElementCollection.manufacturerNameHtml
    );
    addTextNodeToHtmlElement(
        "Sensor Model:" + "\u00a0" + model,
        htmlElementCollection.sensorModelHtml
    );
    addTextNodeToHtmlElement(
        "Sensor Type:" + "\u00a0" + type,
        htmlElementCollection.sensorTypeHtml
    );
    addTextNodeToHtmlElement(
        "Measurement Quantity:" + "\u00a0" + quantity,
        htmlElementCollection.sensorMeasurementQuantityHtml
    );
    addTextNodeToHtmlElement(
        "Sensor Capacity Range:" + "\u00a0" + capacity,
        htmlElementCollection.sensorCapacityRangeHtml
    );

    parsedJSON.length === 0
        ? addHtmlChildElementToParent(
            htmlElementCollection.calRecordsNoticeHtml,
            `<span class='badge bg-danger'>No Records Found</span>`
            )
        : addHtmlChildElementToParent(
            htmlElementCollection.calRecordsNoticeHtml,
            `<span class='badge bg-info'>${parsedJSON.length} Record(s) Found</span>`
            );

    createCalibrationListItem(
      //createCalListItem.js
        parsedJSON,
        htmlElementCollection.calProcedureInfoHtml,
        htmlElementCollection.calProcedureNameHtml,
        location
    );

    //deactive a current table row [index] and hide its info card
    //(only if it was activated during previous click event)
    } else {
        tableRowObj[`row${index}`] = "inactive";
        tableRow = document.getElementById(`row${index}`);
        tableRow.classList.remove("table-active");
        htmlElementCollection.card.style.visibility = "hidden";
        removeAllChildNodes(htmlElementCollection.descriptionHeaderHtml);
        removeAllChildNodes(htmlElementCollection.sensorCommentHtml);
        removeAllChildNodes(htmlElementCollection.manufacturerNameHtml);
        removeAllChildNodes(htmlElementCollection.calProcedureInfoHtml);
        removeAllChildNodes(htmlElementCollection.calProcedureNameHtml);
        removeAllChildNodes(htmlElementCollection.sensorModelHtml);
        removeAllChildNodes(htmlElementCollection.sensorTypeHtml);
        removeAllChildNodes(htmlElementCollection.sensorMeasurementQuantityHtml);
        removeAllChildNodes(htmlElementCollection.sensorCapacityRangeHtml);
        removeAllChildNodes(htmlElementCollection.calRecordsNoticeHtml);
    }
}
