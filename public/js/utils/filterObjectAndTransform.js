//this helper function filters Collection and prepares body JSON object for PATCH API endpoint

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

