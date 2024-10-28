const form = document.getElementById("new-sensor-form");
const submitButton = document.getElementById("post-new-sensor");
var newSensorPostData = {};

//Preset NewSensorForm fields with initial values using GLOBAL SENSOR FACTORY
Object.entries(_sensfactory.newSensorFormInputs).forEach(([key, obj]) => {
    form.elements[key].value = obj.value;
});


var inputs = document.querySelectorAll('input, select, textarea'); 
for (i=0; i<inputs.length; i++){
    inputs[i].oninput = changeHandler;
}

function changeHandler (e) {
    let value = e.target.value;
    let name = e.target.name;
    _sensfactory.newSensorFormInputs[name].value = value;
    submitButton.disabled = !_sensfactory.isSubmitButtonActive();
    if(_sensfactory.isFormInputFieldEmpty(name)) e.target.style.border = "2px solid red" ;
    else e.target.style.border = "2px solid blue";
}



form.addEventListener("submit", submitNewSensorData);

function submitNewSensorData (event) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(form);

    // Loop through all form data and prepare data object for POST request
    for (const [key, value] of formData.entries()) {
        newSensorPostData[key] = value;
        //_sensfactory.newSensorFormInputs[key].value = value;
    }
}