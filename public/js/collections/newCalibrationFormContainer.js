const newCalRecordFormContainer = {
  calibrationName: {
    value: "55520241212-TC",
    validator: () => {},
    inputRule: ``,
  },
  comment: {
    value: "None",
    validator: () => {},
    inputRule: ``,
  },
  adjustmentsMade: {
    value: true,
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
