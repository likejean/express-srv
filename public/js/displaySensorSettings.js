function showSensorInfoCard(
        index,
        description, 
        manufacturer, 
        units, 
        calibrations,
        EID) 
    {

    var parsedJSON = JSON.parse(calibrations.replace(/\&/g, '"'));    
    console.log('EID:::::',EID);
    updateSensorImage (EID);
       
    //Initialize html element variables
    var card = document.getElementById('sensor-details');
    var descriptionHeader = document.querySelector('.sensor-description');
    var calProcedureInfo = document.getElementById('calibration-procedures-list');
    var calProcedureName = document.getElementById('calibration-procedures-badges');
    const descriptionText = document.createTextNode(description);   
    var tableRow;

    

    //CHECK//
    //Check if any 'active' table rows left over from previous click/touch events 
    for (const [key, value] of Object.entries(tableRowObj)) { 
        //deactivate any different tables rows and hide info card (if it's still displayed)
        if (value === 'active' && key !== `row${index}`){            
            tableRowObj[`${key}`]='inactive';
            tableRow = document.getElementById(key);
            tableRow.classList.remove("table-active");
            card.style.visibility = 'hidden';    
            removeAllChildNodes(descriptionHeader); 
            removeAllChildNodes(calProcedureInfo);
            removeAllChildNodes(calProcedureName);
        }         
      } 
      
    //TOGGLE FUNCTION//
    //activate a current table row [index] and display its info card...
    if(tableRowObj[`row${index}`] === 'inactive') {
        tableRowObj[`row${index}`] = 'active';
        tableRow = document.getElementById(`row${index}`);    
        tableRow.classList.add("table-active"); 
        card.style.visibility = 'visible';          
        descriptionHeader.appendChild(descriptionText); 
        createCalibrationListItem(parsedJSON, calProcedureInfo, calProcedureName);       
        
    //deactive a current table row [index] and hide its info card 
    //(only if it was activated during previous click event)
    }else{
        tableRowObj[`row${index}`] = 'inactive';
        tableRow = document.getElementById(`row${index}`);
        tableRow.classList.remove("table-active"); 
        card.style.visibility = 'hidden';
        removeAllChildNodes(descriptionHeader);
        removeAllChildNodes(calProcedureInfo);
        removeAllChildNodes(calProcedureName);
    }  

    //Function helper for removing all children from parent html node
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
       
}