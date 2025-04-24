const form = document.getElementById("new-sensor-form");
const sensFormModalHeaderText = document.querySelector(".new-sensor-modal-header");
const submitButton = document.getElementById("get-sensor-form-values");

var newSensorPostData = {};  //this object for storing POST request body

//this method initializes the form inputs with the default values from the _sensfactory object
//this method is called when the page is loaded
Object.entries(_sensfactory.newSensorFormInputs).forEach(([key, obj]) => {
    form.elements[key].value = obj.value;
    submitButton.disabled = !_sensfactory.isSubmitButtonActive();
});

//Attach eventListeners to all New Sensor Form Inputs to detect input entry events
var inputs = document.querySelectorAll('input, select, textarea'); 
for (i=0; i<inputs.length; i++){
    inputs[i].oninput = inputHandler;
}

//this callback function is used to handle the input event of the form inputs
//this function updates the newSensorPostData object with the new values and updates the submit button state
function inputHandler (e) {
    let value = e.target.value;
    let name = e.target.name;

    _sensfactory.newSensorFormInputs[name].value = value;
    submitButton.disabled = !_sensfactory.isSubmitButtonActive();
    
    if(_sensfactory.isFormInputFieldEmpty(name)) e.target.style.border = "2px solid red" ;
    else e.target.style.border = "2px solid blue";
}


//Attach eventListener to New Sensor Form data Submission event
form.addEventListener("submit", submitNewSensorData);

//callback function for ONSUBMIT eventListener in "getNewSensorFormValues.js"
//this function is called when the user submits the form
function submitNewSensorData (event) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(form);

    //concatenate and populate sensor EID in modal header
    sensFormModalHeaderText.innerText = "Sensor:\u00a0"  + _sensfactory.newSensorFormInputs["EID"].value;
   
    // Loop through all form data and prepare data object for POST request
    for (const [key, value] of formData.entries()) {
        newSensorPostData[key] = value;
    }

	//remove event listeners from all form inputs to prevent multiple submissions
    inputs.forEach((item) => item.removeEventListener("input", inputHandler));
}