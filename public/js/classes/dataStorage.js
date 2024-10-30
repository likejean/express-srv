class dataStorage {
    constructor(
        id,
        procedures,
            calibrations
        ){      
            this.sensors = id,
            this.procedures = procedures,
            this.calibrations = calibrations      
    }

    getSensorNames(){
        return this.sensors.data.payload.forEach(item => item.EID);
    }
    getCalProcedureNames(){

    }
    getCalRecordsNames(){

    }
}

