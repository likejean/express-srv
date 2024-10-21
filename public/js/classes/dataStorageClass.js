class dataStorage {
    constructor(
        sensors,
        calibrations,
        procedures
    ){      
        this.sensors = sensors ? sensors : [],
        this.calibrations = calibrations ? calibrations : [],
        this.procedures = procedures ? procedures : []      
  }
}

//instantiate globalStorage prior to axios fetched data arrives
const globalDataStorage = new dataStorage();
const varib = "get"