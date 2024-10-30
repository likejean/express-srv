function generateSensorProcedureNameLists(sensorIds, procedureIds) {
  const sensorSelectInput = document.getElementById("sensorId");
  const procedureSelectInput = document.getElementById("procedureId");

  for (const property in sensorIds) {
    let option = document.createElement("option");
    option.value = property;
    option.innerHTML = property;
    sensorSelectInput.appendChild(option);
  }

  for (const property in procedureIds) {
    let option = document.createElement("option");
    option.value = property;
    option.innerHTML = property;
    procedureSelectInput.appendChild(option);
  }
}
