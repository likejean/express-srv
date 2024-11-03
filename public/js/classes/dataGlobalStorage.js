class dataStorage {
    constructor(
			sensors,
			procedures,
            calibrations,
			activeSensorCard
        ){      
            this.sensors = sensors,
            this.procedures = procedures,
            this.calibrations = calibrations,
			this.activeSensorCard = activeSensorCard    
    }

    getSensorNames(){
        return this.sensors.data.payload.reduce((obj, sensor) => {
            obj[`${sensor.EID}`] = sensor._id;
            return obj;
        }, {});
    }
    getCalProcedureNames(){
        return this.procedures.data.payload.reduce((obj, procedure) => {
            obj[`${procedure.procedureName}`] = procedure._id;
            return obj;
        }, {});
    }
    getCalRecordNames(){
        return this.calibrations.data.payload.reduce((obj, calibration) => {
            obj[`${calibration.calibrationName}`] = calibration._id;
            return obj;
        }, {});
    }
}

