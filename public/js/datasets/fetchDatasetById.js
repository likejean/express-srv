const sensorDescription = document.getElementById("sensor-full-description");
const chartTitle = document.getElementById("edit-chart-title");


const _store = new dataStorage();   //store all information for active/selected sensor card

const fetchChartDatasetById = async () => {
    //obtain query string by id
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");


 	 // fetch chart dataset by id from MongoDB database
    await axios
    .get(`../api/datasets/${id}`)
    .then((result) => {
        _store.activeDatasetChart = result.data.dataset;
		sensorDescription.innerText = _store.activeDatasetChart.sensorDescription;
		chartTitle.innerText = _store.activeDatasetChart.chartTitle;
		createChartDatasetsAccordion();
		
    })
    .catch((error) => {
        //display error message if data fetch failure occurs or any other internal error detected
        console.log(error);
    });
};

fetchChartDatasetById();