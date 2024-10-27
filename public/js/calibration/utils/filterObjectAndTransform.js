//this helper function filters editCalContentItemActive Collection and prepares body object for PATCH API endpoint
calPatchRequestData = {};

const filterObjectAndTransform = (obj, filterFn) => {
    const result = {};
    for (const key in obj) {
        if (filterFn(obj[key])) {
            obj[key].type == "checkbox"
              ? (result[obj[key].databaseName] = obj[key].checked)
            : (result[obj[key].databaseName] = obj[key].value);
        }
    }
    return result;
};

calPatchRequestData = filterObjectAndTransform(
    _calfactory.inputWrappers,
    (input) => input.status === true
);
