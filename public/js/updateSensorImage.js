function updateSensorImage (EID){
    var sensorImgObj = {
        EID47: "mts_load_cell.jpg",
        EID498: "interface_load_cell.jpg",
        EID1798: "interface_load_cell.jpg",
        EID1722: "interface_load_cell.jpg"
    };
    
    var img = document.getElementById('sensor-image');
    console.log(img);
    console.log(EID);
    img.src=`./img/${sensorImgObj[EID]}`;
}