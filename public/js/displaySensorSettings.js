function showSensorInfoCard(
        index,
        description, 
        manufacturer, 
        units, 
        calibrations,
        EID) 
    {

    var parsedJSON = JSON.parse(calibrations.replace(/\&/g, '"')); 
    var tableRow;

    updateSensorImage (EID);
       
    //Initialize html element variables
    var card = document.getElementById('sensor-details');
    var descriptionHeaderHtml = document.querySelector('.sensor-description');
    var calProcedureInfoHtml = document.getElementById('calibration-procedures-list');
    var calProcedureNameHtml = document.getElementById('calibration-procedures-badges');    
    var manufacturerNameHtml = document.getElementById('sensor-manufacturer');
  

    

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
            removeAllChildNodes(manufacturerNameHtml);
            removeAllChildNodes(calProcedureInfoHtml);
            removeAllChildNodes(calProcedureNameHtml);
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
        addTextNodeToHtmlElement("Manufacturer:\u00a0" + manufacturer, manufacturerNameHtml)
        createCalibrationListItem(parsedJSON, calProcedureInfoHtml, calProcedureNameHtml);       
        
    //deactive a current table row [index] and hide its info card 
    //(only if it was activated during previous click event)
    }else{
        tableRowObj[`row${index}`] = 'inactive';
        tableRow = document.getElementById(`row${index}`);
        tableRow.classList.remove("table-active"); 
        card.style.visibility = 'hidden';
        removeAllChildNodes(descriptionHeaderHtml);
        removeAllChildNodes(manufacturerNameHtml);
        removeAllChildNodes(calProcedureInfoHtml);
        removeAllChildNodes(calProcedureNameHtml);
    }  

    //Function helper for removing all children from parent html node
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
       
}