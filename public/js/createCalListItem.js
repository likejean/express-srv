function createCalibrationListItem (data, list, calName) {
    const unixTimestamp = moment().unix();
    
    for (let i=0; i<data.length; i++){
        let listItem = document.createElement("li");
        let badgeItem = document.createElement("a");

        let lastCalDate = moment.utc(data[i].lastCalibrationDate);
        let dueCalDate = moment.utc(data[i].dueCalibrationDate);
        let extenstionStatus = data[i].calibrationExtended;

        listItem.setAttribute('id', `item${i+1}`);
        badgeItem.href="#";
        listItem.classList.add('list-group-item');
        badgeItem.classList.add('list-group-item');
        listItemObj[`item${i+1}`] = `inactive`; 
        listItem.style.color = dueCalDate.unix() > unixTimestamp ? "black" : "red";
        listItem.style.fontWeight = dueCalDate.unix() > unixTimestamp ? "normal" : "bold";
        badgeItem.style.color = dueCalDate.unix() > unixTimestamp ? "black" : "red";
        badgeItem.style.fontWeight = dueCalDate.unix() > unixTimestamp ? "normal" : "bold";
        


        const calNameText = document.createTextNode(`
            ${data[i].calibrationProcedureName.replace(/{/g, "").replace(/}/g, "")}`
        );
                
        const calInfoText = document.createTextNode(`
            Due Date: <${dueCalDate.format('dddd, MM/DD/YYYY')}>
            Last Date: <${lastCalDate.format('dddd, MM/DD/YYYY')}>
            Extended? <${extenstionStatus?"YES":"NO"}>
            Expired? <${dueCalDate.unix()>unixTimestamp?"NO":"YES"}>`

        );

        
        listItem.appendChild(calInfoText);   
        badgeItem.appendChild(calNameText);    
        list.appendChild(listItem);  
        calName.appendChild(badgeItem);      
        
    }    
}