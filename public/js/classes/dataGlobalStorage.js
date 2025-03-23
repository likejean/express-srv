class dataStorage {
    constructor(
			users,
			sensors,
			procedures,
            calibrations,
			datasets,
			activeSensorCard,
			selectedTableRowProcedureId,
			selectedTableRowUserId,
			certificateInfoIcon,
            tableHeaders,
        ){      
			this.users = users,
            this.sensors = sensors,
            this.procedures = procedures,
            this.calibrations = calibrations,
			this.datasets = datasets,
			this.activeSensorCard = activeSensorCard,
			this.selectedTableRowProcedureId = selectedTableRowProcedureId,
			this.selectedTableRowUserId = selectedTableRowUserId,
			this.certificateInfoIcon = certificateInfoIcon
            this.tableHeaders = tableHeaders,
			this.sensorTableActiveRowObject = {}
    }

	getSensorTableActiveRowObject(length){	
		this.sensorTableActiveRowObject = {};	
		for (var i = 0; i < length; i++){
			this.sensorTableActiveRowObject[`row${i + 1}`] = `inactive`;
		}
	}

	getSensorEIDs(){
        return this.sensors.data.payload.reduce((obj, sensor) => {
            obj[`${sensor.EID}`] = sensor._id;
            return obj;
        }, {});
    }

	getSensorCalibrationNames(){
		return this.activeSensorCard.calibrations.reduce((obj, calibration) => {
            obj[`${calibration.calibrationName}`] = calibration._id;
            return obj;
        }, {});;
	}

	getActiveSensorCard(){
		return this.activeSensorCard;
	}

	getSensorTypeList(){
        const types = this.sensors.data.payload.map(obj => obj["type"]);
		return [...new Set(types)];
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

