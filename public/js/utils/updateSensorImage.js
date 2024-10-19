function updateSensorImage (EID){       
    var img = document.getElementById('sensor-image');
    img.src=`./img/${sensorImageCollection[EID]}`;
}
