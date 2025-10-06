//this function is being called in showSensorInfoCard.js
function updateSensorImage(EID) {
	//EID = sensor EID (string)
	//collection of sensor images mapped to their respective EIDs
	
    var img = document.getElementById("sensor-image");

    //if image is not listed in collection, get a default image
    if (!sensorImageCollection[EID]) img.src = `./img/calibration.jpg`;    
    else img.src = `./img/${sensorImageCollection[EID]}`;
}
