const sensorDescription = document.getElementById("sensor-full-description");
const chartTitle = document.getElementById("editChartTitleSpan");
const editChartXLabelSpan = document.getElementById("editChartXLabelSpan");
const editChartYLabelSpan = document.getElementById("editChartYLabelSpan");


const fetchChartById = async () => {
    //obtain query string by id
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");


 	 // fetch chart dataset by id from MongoDB database
    await axios
    .get(`../api/datasets/${id}`)
    .then((result) => {
        _chartfactory.dataset = result.data.dataset;
		sensorDescription.innerText = result.data.dataset.sensorDescription;
		chartTitle.innerText = result.data.dataset.chartTitle;
        editChartXLabelSpan.innerText = result.data.dataset.chartXLabel;
        editChartYLabelSpan.innerText = result.data.dataset.chartYLabel;
		createChartDatasetsAccordion();
        
        return axios
        .get(`../api/calibrations/fetchBySensorId/${_chartfactory.dataset.sensorId._id}`)
        .then((result) => {
            _chartfactory.calibrations = result.data.calibrations;
            generateCalibrationNameList(_chartfactory.getSensorCalibrationNames());
        })
        .catch((error) => {
            //display error message if data fetch failure occurs or any other internal error detected
            console.log(error);
        })		
    })
    .catch((error) => {
        //display error message if data fetch failure occurs or any other internal error detected
        console.log(error);
    });
};

fetchChartById();