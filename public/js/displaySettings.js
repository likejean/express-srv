function showSensorDetailsAndSettings(
    index,
    description, 
    manufacturer, 
    units, 
    expirationDate) 
    {
    
    var node = document.getElementById('sensor-details');

    if (node.style.visibility=='visible') {
        node.style.visibility = 'hidden';
    }

    else
        node.style.visibility = 'visible';
       
}