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
        if (value === 'active' && key !== `row${index}`){            
            rowObj[`${key}`]='inactive';
            tableRow = document.getElementById(key);
            tableRow.classList.remove("table-active");
            card.style.visibility = 'hidden';
        }         
      }    

    if(rowObj[`row${index}`] === 'inactive') {
        rowObj[`row${index}`] = 'active';
        tableRow = document.getElementById(`row${index}`);    
        tableRow.classList.add("table-active"); 
        card.style.visibility = 'visible';
    }else{
        rowObj[`row${index}`] = 'inactive';
        tableRow = document.getElementById(`row${index}`);
        tableRow.classList.remove("table-active"); 
        card.style.visibility = 'hidden';
    }
    
   
   
       
}