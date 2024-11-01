//this function is being called in showSensorInfoCard.js
function updateSensorImage(EID) {
    var img = document.getElementById("sensor-image");

    //if image is not listed in collection, get a default image
    if (!sensorImageCollection[EID]) img.src = `./img/calibration.jpg`;
    //else display associated iamge
    else img.src = `./img/${sensorImageCollection[EID]}`;
}
