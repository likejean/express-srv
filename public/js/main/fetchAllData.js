const fetchAllData = async () => {
  let notification = document.querySelector(".notification");

  // fetch all data using POST API endpoints: sensors, calibrations, procedures
  await Promise.all([
    axios.get("/api/sensors"),
    axios.get("/api/calibrations"),
    axios.get("/api/procedures"),
  ])
    .then((result) => {
      //console.log('dkafjksjfkldf',globalDataStorage);

      //store all data in browser's local storage and internal global storage
      result.forEach((elem) => {
        let name = elem.data.collectionName;
        window.localStorage.setItem(name, JSON.stringify(elem.data.payload));
      });

      //If successful fetch being executed, retrieve all data
      const sensors = result[0].data.payload;
      const calibrations = result[1].data.payload;
      const procedures = result[2].data.payload;

      //function call to create all cells for main sensor table
      createMainSensorTable(sensors, calibrations);
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

fetchAllData();
