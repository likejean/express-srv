function showSensorDetailsAndSettings(
    index,
    description, 
    manufacturer, 
    units, 
    expirationDate,
    EID) 
    {
     
    
    var card = document.getElementById('sensor-details');
    var tableRow;

    for (const [key, value] of Object.entries(rowObj)) {
        
        if (value==='active'){
            rowObj[`${key}`]='inactive';
            tableRow = document.getElementById(key);
            tableRow.classList.remove("table-active");
        }         
      }    

    if(rowObj[`row${index}`] === 'inactive') {
        rowObj[`row${index}`] = 'active';
        tableRow = document.getElementById(`row${index}`);    
        tableRow.classList.add("table-active"); 
    }else{
        rowObj[`row${index}`] = 'inactive';
        tableRow.classList.remove("table-active"); 
    }
    
   
    if (card.style.visibility=='visible') {
        card.style.visibility = 'hidden';
    }

    else card.style.visibility = 'visible';
       
}