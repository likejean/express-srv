function showSensorDetailsAndSettings(
    index,
    description, 
    manufacturer, 
    units, 
    expirationDate,
    EID) 
    {
     
    //Initialize html element variables
    var card = document.getElementById('sensor-details');
    var tableRow;

    //CHECK//
    //Check if any 'active' table rows left over from previous click/touch events 
    for (const [key, value] of Object.entries(rowObj)) { 
        //deactivate any different tables rows and hide info card (if it's still displayed)
        if (value === 'active' && key !== `row${index}`){            
            rowObj[`${key}`]='inactive';
            tableRow = document.getElementById(key);
            tableRow.classList.remove("table-active");
            card.style.visibility = 'hidden';
        }         
      } 
      
    //TOGGLE FUNCTION//
    //activate a current table row [index] and display its info card...
    if(rowObj[`row${index}`] === 'inactive') {
        rowObj[`row${index}`] = 'active';
        tableRow = document.getElementById(`row${index}`);    
        tableRow.classList.add("table-active"); 
        card.style.visibility = 'visible';
    //deactive a current table row [index] and hide its info card 
    //(only if it was activated during previous click event)
    }else{
        rowObj[`row${index}`] = 'inactive';
        tableRow = document.getElementById(`row${index}`);
        tableRow.classList.remove("table-active"); 
        card.style.visibility = 'hidden';
    }  
       
}