class dataStorage {
    constructor(
			users,
			sensors,
			procedures,
            calibrations,
			activeSensorCard,
			selectedTableRowProcedureId,
			selectedTableRowUserId,
			certificateInfoIcon
        ){      
			this.users = users,
            this.sensors = sensors,
            this.procedures = procedures,
            this.calibrations = calibrations,
			this.activeSensorCard = activeSensorCard,
			this.selectedTableRowProcedureId = selectedTableRowProcedureId,
			this.selectedTableRowUserId = selectedTableRowUserId,
			this.certificateInfoIcon = certificateInfoIcon
    }

    getSensorNames(){
        return this.sensors.data.payload.reduce((obj, sensor) => {
            obj[`${sensor.EID}`] = sensor._id;
            return obj;
        }, {});
    }
	
	getSensorDescriptionList() {
		const descriptions = this.sensors.data.payload.map(obj => obj["description"]);
		return [...new Set(descriptions)];
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

