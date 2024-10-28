const newSensorFormContainer = {
    EID:{
        value:"EIDXXX", 
        validator: () => {},
        inputRule: ``,
    },
    type:{
        value:"Type", 
        validator: () => {},
        inputRule: ``,
    },
    calibrationPriority: {
        value:"Mandatory", 
        validator: () => {},
        inputRule: ``,
    },
    calibrationFrequency: {
        value:"Annually", 
        validator: () => {},
        inputRule: ``,
    },
    calibratedBy:{
        value:"Intec", 
        validator: () => {},
        inputRule: ``,
    },
    location: {
        value:"Portable", 
        validator: () => {},
        inputRule: ``,
    },
    description: {
        value:"Sensor Description", 
        validator: () => {},
        inputRule: ``,
    },
    capacityRange: {
        value:"Capacity Range", 
        validator: () => {},
        inputRule: ``,
    },
    comment: {
        value:"None", 
        validator: () => {},
        inputRule: ``,
    },
    model: {
        value:"Model", 
        validator: () => {},
        inputRule: ``,
    },
    quantity: {
        value:"Quantity", 
        validator: () => {},
        inputRule: ``,
    },
    manufacturer: {
        value:"MTS", 
        validator: () => {},
        inputRule: ``,
    }
}

var _sensfactory = new sensorFactory(newSensorFormContainer);