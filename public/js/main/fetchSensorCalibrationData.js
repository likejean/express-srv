const _store = new dataStorage();

const fetchSensorCalibrationData = async () => {
  let notification = document.querySelector(".notification");

  // fetch all data using POST API endpoints: sensors, calibrations, procedures
  await Promise.all([axios.get("/api/sensors"), axios.get("/api/calibrations")])
    .then((result) => {
      //console.log('dkafjksjfkldf',globalDataStorage);

      //store all data in browser's local storage
      result.forEach((elem) => {
        let name = elem.data.collectionName;
        _store[name] = elem;
      });

      //function call to create all cells for main sensor table
      createMainSensorTable(
        _store.sensors.data.payload,
        _store.calibrations.data.payload
      );
    })
    .catch((error) => {
      //display error message if data fetch failure occurs or any other internal error detected
      notification.innerHTML = `
          <div class="text-center">
              <div class="alert alert-danger" role="alert"> NOTE! No sensor data exists or unable to fetch due to system failure.</div>
              <div class="alert alert-danger" role="alert">${error}</div>
          </div>`;
    });
};

fetchSensorCalibrationData();
