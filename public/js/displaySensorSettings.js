function showSensorInfoCard(
        index,
        description, 
        manufacturer, 
        quantity, 
        calibrations,
        EID,
        model,
        type,
        capacity,
        location,
        comment) 
    {

    var parsedJSON = JSON.parse(calibrations.replace(/\&/g, '"')); 
    var tableRow;

    updateSensorImage (EID);
       
    //Initialize html element variables
    var card = document.getElementById('sensor-details');
    var sensorCommentHtml = document.getElementById('sensor-comment');
    var descriptionHeaderHtml = document.getElementById('sensor-description');
    var sensorTypeHtml = document.getElementById('sensor-type');
    var sensorModelHtml = document.getElementById('sensor-model');
    var sensorMeasurementQuantityHtml = document.getElementById('sensor-quantity');
    var sensorCapacityRangeHtml = document.getElementById('sensor-capacity');
    var manufacturerNameHtml = document.getElementById('sensor-manufacturer');
    var calProcedureNameHtml = document.getElementById('calibration-procedures-badges');
    var calProcedureInfoHtml = document.getElementById('calibration-procedures-list');
    
  

    

    //CHECK//
    //Check if any 'active' table rows left over from previous click/touch events 
    for (const [key, value] of Object.entries(tableRowObj)) { 
        //deactivate any different tables rows and hide info card (if it's still displayed)
        if (value === 'active' && key !== `row${index}`){            
            tableRowObj[`${key}`]='inactive';
            tableRow = document.getElementById(key);
            tableRow.classList.remove("table-active");
            card.style.visibility = 'hidden';    
            removeAllChildNodes(descriptionHeaderHtml); 
            removeAllChildNodes(sensorCommentHtml);
            removeAllChildNodes(manufacturerNameHtml);
            removeAllChildNodes(calProcedureInfoHtml);
            removeAllChildNodes(calProcedureNameHtml);
            removeAllChildNodes(sensorModelHtml);
            removeAllChildNodes(sensorTypeHtml);
            removeAllChildNodes(sensorMeasurementQuantityHtml);
            removeAllChildNodes(sensorCapacityRangeHtml);
        }         
      } 
      
    //TOGGLE FUNCTION//
    //activate a current table row [index] and display its info card...
    if(tableRowObj[`row${index}`] === 'inactive') {
        tableRowObj[`row${index}`] = 'active';
        tableRow = document.getElementById(`row${index}`);    
        tableRow.classList.add("table-active"); 
        card.style.visibility = 'visible'; 
        addTextNodeToHtmlElement(description + "\u00a0" + EID, descriptionHeaderHtml);
        addTextNodeToHtmlElement("NOTE:\u00a0" + comment, sensorCommentHtml);
        addTextNodeToHtmlElement("Manufacturer:\u00a0" + manufacturer, manufacturerNameHtml)
        addTextNodeToHtmlElement("Sensor Model:" + "\u00a0" + model, sensorModelHtml);
        addTextNodeToHtmlElement("Sensor Type:" + "\u00a0" + type, sensorTypeHtml);
        addTextNodeToHtmlElement("Measurement Quantity:" + "\u00a0" + quantity, sensorMeasurementQuantityHtml);
        addTextNodeToHtmlElement("Sensor Capacity Range:" + "\u00a0" + capacity, sensorCapacityRangeHtml);
        createCalibrationListItem(parsedJSON, calProcedureInfoHtml, calProcedureNameHtml, location);       
        
    //deactive a current table row [index] and hide its info card 
    //(only if it was activated during previous click event)
    }else{
        tableRowObj[`row${index}`] = 'inactive';
        tableRow = document.getElementById(`row${index}`);
        tableRow.classList.remove("table-active"); 
        card.style.visibility = 'hidden';
        removeAllChildNodes(descriptionHeaderHtml);
        removeAllChildNodes(sensorCommentHtml);
        removeAllChildNodes(manufacturerNameHtml);
        removeAllChildNodes(calProcedureInfoHtml);
        removeAllChildNodes(calProcedureNameHtml);
        removeAllChildNodes(sensorModelHtml);
        removeAllChildNodes(sensorTypeHtml);
        removeAllChildNodes(sensorMeasurementQuantityHtml);
        removeAllChildNodes(sensorCapacityRangeHtml);
    }  

    //Function helper for removing all children from parent html node
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
       
}