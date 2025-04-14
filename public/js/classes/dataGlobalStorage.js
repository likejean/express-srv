class dataStorage {
    constructor(
			users,
			sensors,
			procedures,
            calibrations,
			datasets,
			activeSensorCard,
			activeDatasetChart,
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
			this.activeDatasetChart = activeDatasetChart,
			this.selectedTableRowProcedureId = selectedTableRowProcedureId,
			this.selectedTableRowUserId = selectedTableRowUserId,
			this.certificateInfoIcon = certificateInfoIcon
            this.tableHeaders = tableHeaders,
			this.sensorTableActiveRowObject = {}
    }

	//sort sensors array by the calibration due date
	sortSensorsByDate() {
		this.sensors.data.payload.sort((a, b) => {
			let a_dueDate = new Date(Math.max(...a.calibrations.map(e => new Date(e.dueCalibrationDate))));
			let b_dueDate = new Date(Math.max(...b.calibrations.map(e => new Date(e.dueCalibrationDate))));
			return a_dueDate - b_dueDate;
		});
		return this.sensors.data.payload;
	}

	//generate the object to trace a user selected row in the sensor table
	getSensorTableActiveRowObject(length){	
		this.sensorTableActiveRowObject = {};	
		for (var i = 0; i < length; i++){
			this.sensorTableActiveRowObject[`row${i + 1}`] = `inactive`;
		}
	}
	
	//obtain all sensor EIDs w/ its associated database _id's
	getSensorEIDs(){
        return this.sensors.data.payload.reduce((obj, sensor) => {
            obj[`${sensor.EID}`] = sensor._id;
            return obj;
        }, {});
    }

	//obtain sensor calibration names
	getSensorCalibrationNames(){
		return this.activeSensorCard.calibrations.reduce((obj, calibration) => {
            obj[`${calibration.calibrationName}`] = calibration._id;
            return obj;
        }, {});;
	}

	//get calibration by its name
	getCalibrationIdByName(name){
		return this.activeSensorCard.calibrations.find(cal => cal.calibrationName === name)._id
	}

	//get active sensor card (dispalyed by user by selecting a row in the Main Sensor Table)
	getActiveSensorCard(){
		return this.activeSensorCard;
	}

	//obtain sensor type list
	getSensorTypeList(){
        const types = this.sensors.data.payload.map(obj => obj["type"]);
		return [...new Set(types)];
    }
	
	//obtain sensor description list
	getSensorDescriptionList() {
		const descriptions = this.sensors.data.payload.map(obj => obj["description"]);
		return [...new Set(descriptions)];
	}

	//get object of all calibration procedures names
    getCalProcedureNames(){
        return this.procedures.data.payload.reduce((obj, procedure) => {
            obj[`${procedure.procedureName}`] = procedure._id;
            return obj;
        }, {});
    }

	//get object of all calibration records names
    getCalRecordNames(){
        return this.calibrations.data.payload.reduce((obj, calibration) => {
            obj[`${calibration.calibrationName}`] = calibration._id;
            return obj;
        }, {});
    }

	isDatasetChartsExist(sensorId) {
		return this.datasets.data.payload.some(item => item.sensorId === sensorId);
	}
}

