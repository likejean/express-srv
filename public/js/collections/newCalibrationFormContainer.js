const newCalRecordFormContainer = {
  sensorId: {
    value: "",
    validator: () => {},
    inputRule: ``,
  },
  procedureId: {
    value: "",
    validator: () => {},
    inputRule: ``,
  },
  calibrationName: {
    value: "55520241212-TC",
    validator: () => {},
    inputRule: ``,
  },
  calibrationLastDate: {
    value: "",
    validator: () => {},
    inputRule: ``,
  },
  calibrationDueDate: {
    value: "",
    validator: () => {},
    inputRule: ``,
  },
  calibrationExtended: {
    value: false,
    validator: () => {},
    inputRule: ``,
  },
  adjustmentsMade: {
    value: false,
    validator: () => {},
    inputRule: ``,
  },
  comment: {
    value: "None.",
    validator: () => {},
    inputRule: ``,
  },
  maxCalibrationExtension: {
    value: "",
    validator: () => {},
    inputRule: ``,
  },
  calibrationRangePercent: {
    value: 0,
    validator: () => {},
    inputRule: ``,
  },
};

//Instantiation of calibationFactory Class
const _calfactory = new calibrationFactory(
  "",
  "",
  "",
  editCalibrationInputContainer,
  newCalRecordFormContainer
);
