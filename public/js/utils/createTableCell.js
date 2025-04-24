//this function creates a table cell with the specified tag, text, classes, and attributes
function createTableCell(tag, text, classArr, attrArr){                    
    const cell = document.createElement(tag);
    if (classArr.length > 0) {
        classArr.forEach((item) => {
            cell.classList.add(item); 
        });
    }  
	if (attrArr.length > 0) {
        attrArr.forEach((item) => {
            cell.setAttribute(item.attribute, item.value); 
        });
    }              
    const cellText = document.createTextNode(text);
    cell.appendChild(cellText);          
    return cell;
}