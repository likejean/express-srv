// GLOBAL FACTORY for new sensor form 
class sensorFactory {
    constructor(
            EID, 
            type,
            calibrationPriority,
            calibrationFrequency,
            calibratedBy,
            location,
            description,
            capacityRange,
            comment,
            model,
            quantity,
            manufacturer
        ){
            this.EID = EID, 
            this.type = type,
            this.calibrationPriority = calibrationPriority,
            this.calibrationFrequency = calibrationFrequency,
            this.calibratedBy = calibratedBy,
            this.location = location,
            this.description = description,
            this.capacityRange = capacityRange,
            this.comment = comment,
            this.model = model,
            this.quantity = quantity,
            this.manufacturer = manufacturer
    }
}