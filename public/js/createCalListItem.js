function createCalibrationListItem (data, calItem) {
    for (let i=0; i<data.length; i++){
        let listItem = document.createElement("li");
        listItem.setAttribute('id', `item${i+1}`);
        listItem.classList.add('list-group-item');
        listItemObj[`item${i+1}`] = `inactive`;         
        const calNameText = document.createTextNode(data[i].calibrationProcedureName);
        listItem.appendChild(calNameText); 
        calItem.appendChild(listItem);         
    }
    return calItem;
}