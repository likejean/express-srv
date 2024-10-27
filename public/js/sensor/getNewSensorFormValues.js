const form = document.getElementById("newSensorForm");
var newSensorPostData = {};
var _sensfactory = new sensorFactory();

form.addEventListener("submit", submitNewSensorData);

function submitNewSensorData (event) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(form);

    // Loop through all form data and prepare data object for POST request
    for (const [key, value] of formData.entries()) {
        newSensorPostData[key] = value;
        _sensfactory[key] = value;
    }

    console.log(newSensorPostData);
    console.log(_sensfactory);
}