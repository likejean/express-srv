const form = document.getElementById("newSensorForm");

console.log(form)

form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log(event.target.value)
    const formData = new FormData(form);

    console.log(formData)

    // Get the value of a specific field
    const name = formData.get("EID");

    // Loop through all form data
    for (const [key, value] of formData.entries()) {
        console.log(key, value);
    }
});