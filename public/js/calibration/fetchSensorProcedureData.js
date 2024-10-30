const _store = new dataStorage();

const fetchSensorProcedureData = async () => {
  // fetch all data using POST API endpoints: sensors, calibrations, procedures
  await Promise.all([axios.get("/api/sensors"), axios.get("/api/procedures")])
    .then((result) => {
      //console.log('dkafjksjfkldf',globalDataStorage);

      //store all data in browser's local storage
      result.forEach((elem) => {
        let name = elem.data.collectionName;
        _store[name] = elem;
      });

    })
    .catch((error) => {
      //display error message if data fetch failure occurs or any other internal error detected
      console.log(error);
    });
};

fetchSensorProcedureData();
