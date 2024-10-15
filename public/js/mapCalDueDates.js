const mapCalDueDatesAndBuildTableCell = function (data){

    const cell = document.createElement("td"); 
    const unixTimestamp = moment().unix();
    let dueCalDate, iconHtmlText;   
    
    for(let i=0; i<data.calibrations.length; i++){        
        dueCalDate =  moment.utc(data.calibrations[i].dueCalibrationDate).unix(); 
        iconHtmlText = unixTimestamp > dueCalDate 
        ? '<i style="color:red" class="ms-2 fa-duotone fa-solid fa-bell" </i>'
        : '<i style="color:lightgreen" class="ms-2 fa-regular fa-circle-check" </i>';
        cell.innerHTML += iconHtmlText;
    }
    return cell;
}

