function createNewSensorRecord() {
  //use POST API endpoint to create new sensor	
    axios
        .post(`../api/sensors`, newSensorPostData)
        .then((response) => {
        console.log("New sensor created successfully:", response);
        form.removeEventListener("submit", submitNewSensorData);
        window.location.href = "../index.html";
    })
        .catch((error) => {
        console.log("ERROR:", error);
    });
}
