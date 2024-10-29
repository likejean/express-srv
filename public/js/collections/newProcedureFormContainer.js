const newCalProcedureFormContainer = {
    model:{
        value:"1610AJH-50K", 
        validator: () => {},
        inputRule: ``,
    },
    quantity:{
        value:"Load", 
        validator: () => {},
        inputRule: ``,
    },
    units: {
        value:"lbf", 
        validator: () => {},
        inputRule: ``,
    },
    startRangeLevel: {
        value: 0, 
        validator: () => {},
        inputRule: ``,
    },
    endRangeLevel:{
        value:500, 
        validator: () => {},
        inputRule: ``,
    },
    description: {
        value:"Gold Standard Force Calibration Transducer", 
        validator: () => {},
        inputRule: ``,
    },
    calibrationPrinciple: {
        value:"Force", 
        validator: () => {},
        inputRule: ``,
    },
    comment: {
        value:"None", 
        validator: () => {},
        inputRule: ``,
    },
    manufacturer: {
        value:"Interface", 
        validator: () => {},
        inputRule: ``,
    }
}

var _procfactory = new procedureFactory(newCalProcedureFormContainer);