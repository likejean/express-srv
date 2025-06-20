// Build special table icon cell to display overall calibration due date status
const mapCalDueDatesAndBuildTableCell = function (data, sensorId) {
    const cell = document.createElement("td");
    const unixTimestamp = moment().unix();
    let dueCalDate, iconHtmlText;

    if (data.length === 0) {
        cell.innerHTML = '<span class="badge bg-dark">NONE</span>';
    } else {	
        
		_store.isDatasetChartsExist(sensorId) 
		? cell.innerHTML += `<i style="color:#58C2FF; margin-left:-17px;" class="far fa-chart-bar"></i><span id="charts-count">${_store.datasetChartsCount(sensorId)}</span>` : '';	
        for (let i = 0; i < data.length; i++) {
			dueCalDate = moment.utc(data[i].dueCalibrationDate).unix();
			iconHtmlText =
				unixTimestamp > dueCalDate
				? '<i style="color:red;" class="ms-2 fa-duotone fa-solid fa-bell" </i>'
				: data[i].calibrationExtended === false
                    ?
                    '<i style="color:lightgreen;" class="ms-2 fa-regular fa-circle-check" </i>'
                    :
                    '<i style="color:orange;" class="ms-2 fa-regular fa-circle-check" </i>'
			cell.innerHTML += iconHtmlText;
        }
		
    }
    return cell;
};
