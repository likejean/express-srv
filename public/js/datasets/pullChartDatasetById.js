function pullChartDatasetById(datasetId) {

	//obtain query string by id
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let chartId = urlParams.get("id");

	//use PATCH API endpoint to update option in existing chart record
    axios
    .patch(`../api/datasets/pull/${chartId}`, {datasetId})
    .then((response) => {
        icons.forEach((icon) => {
            icon.removeEventListener("click", editChartIconClickEventCallback);
        });
        window.location.reload();
        console.log("Chart dataset was pulled out successfully:", response);              
    })
    .catch((error) => {
        console.log("ERROR", error);
    });
}