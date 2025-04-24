//this helper function filters Collection and prepares body JSON object for PATCH API endpoint
//this function is used to filter the chart options and prepare the request body for the PATCH API endpoint
//this function takes an object and a filter function as arguments and returns a new object with only the properties that pass the filter function

const filterObjectAndTransform = (obj, filterFn) => {
    const result = {};
    for (const key in obj) {
        if (filterFn(obj[key])) {
			obj[key].attributes.type == "checkbox"
			? (result[obj[key].databaseName] = obj[key].checked)
			: (result[obj[key].databaseName] = obj[key].value);
        }
    }
    return result;
};

