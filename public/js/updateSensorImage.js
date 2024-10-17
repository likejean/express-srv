function updateSensorImage (EID){
    var sensorImgObj = {
        EID47: "load_transducer_EID47.jpg",
        EID498: "load_transducer__EID498.jpg",
        EID1798: "load_transducer_EID1798.jpg",
        EID1722: "load_transducer_EID1722.jpg"
    };
    
    var img = document.getElementById('sensor-image');
    console.log(img);
    console.log(EID);
    img.src=`./img/${sensorImgObj[EID]}`;
}