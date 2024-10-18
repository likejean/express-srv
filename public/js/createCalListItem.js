function createCalibrationListItem (data, list, calName, calLocation) {
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
        
        listItem.style.color = dueCalDate.unix() > unixTimestamp ? "black" : "red";       
        badgeItem.style.backgroundColor = "grey";
        badgeItem.style.color = dueCalDate.unix() > unixTimestamp ? "white" : "rgb(255, 153, 153)";    
        
        
        console.log(data[i].calibrationProcedureName);
        


        const calNameText = document.createTextNode(`
            ${data[i].calibrationProcedureName.replace(/{/g, "").replace(/}/g, "")}`
        );
                
        const calInfoText = document.createTextNode(`
            Where? ${calLocation}
            \u00a0\u00a0\u00a0\u00a0Last Date: ${lastCalDate.format('dddd, MM/DD/YYYY')}
            \u00a0\u00a0\u00a0\u00a0Due Date: ${dueCalDate.format('dddd, MM/DD/YYYY')}
            \u00a0\u00a0\u00a0\u00a0Extended? ${extenstionStatus?"YES":"NO"}
            \u00a0\u00a0\u00a0\u00a0Expired? ${dueCalDate.unix()>unixTimestamp?"NO":"YES"}`
        );
       
        listItem.appendChild(calInfoText);   
        badgeItem.appendChild(calNameText);             
        list.appendChild(listItem); 
        calName.appendChild(badgeItem);      
        
    }    
}