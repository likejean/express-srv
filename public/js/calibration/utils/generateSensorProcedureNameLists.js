function generateSensorProcedureNameLists(sensorIds, procedureIds) {
  // Get <selection /> Html elements for SensorEIDs & Procedure Names
  const sensorSelectInput = document.getElementById("sensorId");
  const procedureSelectInput = document.getElementById("procedureId");

  //Generate and append  <option /> Html elements for Sensor EIDs
  for (const property in sensorIds) {
    let option = document.createElement("option");
    option.value = property;
    option.innerHTML = property;
    sensorSelectInput.appendChild(option);
  }

  //Generate and append <option /> Html elements for Procedure Names 
  for (const property in procedureIds) {
    let option = document.createElement("option");
    option.value = property;
    option.innerHTML = property;
    procedureSelectInput.appendChild(option);
  }
}
