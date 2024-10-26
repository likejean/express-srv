// Build special table icon cell to display overall calibration due date status 
const mapCalDueDatesAndBuildTableCell = function (data){

    const cell = document.createElement("td"); 
    const unixTimestamp = moment().unix();
    let dueCalDate, iconHtmlText;   

    if (data.length === 0){
        cell.innerHTML = '<span class="badge bg-danger-subtle">NONE</span>'
    }else{
        for(let i=0; i < data.length; i++){        
            dueCalDate =  moment.utc(data[i].dueCalibrationDate).unix(); 
            iconHtmlText = unixTimestamp > dueCalDate 
            ? '<i style="color:red" class="ms-2 fa-duotone fa-solid fa-bell" </i>'
            : '<i style="color:lightgreen" class="ms-2 fa-regular fa-circle-check" </i>';
            cell.innerHTML += iconHtmlText;
        }
    }
    
    
    return cell;
}

