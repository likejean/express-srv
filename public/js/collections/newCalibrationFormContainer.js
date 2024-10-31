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
    value: moment().format("YYYY-MM-DD"),
    validator: () => {},
    inputRule: ``,
  },
  calibrationDueDate: {
    value: moment().format("YYYY-MM-DD"),
    validator: () => {},
    inputRule: ``,
  },
  calibrationExtended: {
    checked: false,
    validator: () => {},
    inputRule: ``,
  },
  adjustmentsMade: {
    checked: true,
    validator: () => {},
    inputRule: ``,
  },
  comment: {
    value: "TBD...",
    validator: () => {},
    inputRule: ``,
  },
  maxCalibrationExtension: {
    value: "6-months",
    validator: () => {},
    inputRule: ``,
  },
  calibrationRangePercent: {
    value: 100,
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
