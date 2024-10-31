const newCalProcedureFormContainer = {
    calibratorModel:{
        value:"1610AJH-50K", 
        validator: () => {},
        inputRule: ``,
        regex:""
    },
    measurementQuantity:{
        value:"Load", 
        validator: () => {},
        inputRule: ``,
        regex:""
    },
    units: {
        value:"lbf", 
        validator: () => {},
        inputRule: ``,
        regex:""
    },
    startRangeLevel: {
        value: 0, 
        validator: () => {},
        inputRule: ``,
        regex:""
    },
    endRangeLevel:{
        value:500, 
        validator: () => {},
        inputRule: ``,
        regex:""
    },
    description: {
        value:"Gold Standard Force Calibration Transducer", 
        validator: () => {},
        inputRule: ``,
        regex:""
    },
    calibrationPrinciple: {
        value:"Force", 
        validator: () => {},
        inputRule: ``,
        regex:""
    },
    comment: {
        value:"None", 
        validator: () => {},
        inputRule: ``,
        regex:""
    },
    manufacturer: {
        value:"Interface", 
        validator: () => {},
        inputRule: ``,
        regex:""
    }
}

var _procfactory = new procedureFactory(newCalProcedureFormContainer);