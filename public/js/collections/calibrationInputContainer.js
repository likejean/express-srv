const allowedChars = /^[-., a-zA-Z0-9]*$/;
const limitCommentText = /^.{10,40}$/;
const validateDateFormat = /^\d{4}-\d{2}-\d{2}$/; 


const calibrationInputContainer = {
        
    //Calibration Record Card Input Wrappers
    calNameWrapper: {
        status: false,
        type: "text",
        name: "calName",
        value: "",
        class: "form-control",
        childNodes: [],
        databaseName: "calibrationName",
        validator: (text) => (allowedChars.test(text) ? true : false),
        inputRule: `Error! No special characters allowed here (exception: dashes "-")`,
      },
    lastCalDateWrapper: {
        status: false,
        type: "date",
        name: "lastCalDate",
        value: "",
        class: "form-control",
        childNodes: [],
        databaseName: "lastCalibrationDate",        
        validator: (dateString) => {
          if (validateDateFormat.test(dateString)) {
            const date = new Date(dateString);
            return (date instanceof Date && !isNaN(date));
          } 
          return false;
        },
        inputRule: `Date must be valid format: 2020-01-01`,
    },
    dueCalDateWrapper: {
        status: false,
        type: "date",
        name: "dueCalDate",
        value: "",
        class: "form-control",
        childNodes: [],
        databaseName: "dueCalibrationDate",        
        validator: (dateString) => {
          if (validateDateFormat.test(dateString)) {
            const date = new Date(dateString);
            return (date instanceof Date && !isNaN(date));
          } 
          return false;
        },
        inputRule: `Date must be valid format: 2020-01-01`,
    },
    calExtendedWrapper: {
        status: false,
        type: "checkbox",
        name: "calExtended",
        value: "",
        checked: false,
        class: "form-check-input",
        childNodes: [],
        databaseName: "calibrationExtended",
    },
    maxCalExtentionWrapper: {
        status: false,
        type: "text",
        name: "maxCalExtention",
        value: "",
        class: "form-control",
        childNodes: [],
        databaseName: "maxCalibrationExtension",
    },
    calRangePercentWrapper: {
        status: false,
        type: "number",
        name: "calRangePercent",
        value: "",
        class: "form-control",
        childNodes: [],
        databaseName: "calibrationRangePercent",
        validator: (number) => (number <= 100 && number >= 10 ? true : false),
        inputRule: `Error! Only positive integers allowed within range: 10%-100%`,
    },
    calAdjustmentMadeWrapper: {
        status: false,
        type: "checkbox",
        name: "calAdjustmentMade",
        value: "",
        checked: false,
        class: "form-check-input",
        childNodes: [],
        databaseName: "adjustmentsMade",
    },
    calCommentWrapper: {
        status: false,
        type: "text",
        name: "calComment",
        value: "",
        class: "form-control",
        childNodes: [],
        databaseName: "comment",        
        validator: (text) => (limitCommentText.test(text) ? true : false),
        inputRule: `Minimum 10 and maximum 40 characters are allowed here...`,
    },
};

//Instantiation of calibationFactory Class
const _calfactory = new calibrationFactory("",{},{}, calibrationInputContainer)

