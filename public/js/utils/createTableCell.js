//creates a table cell
function createTableCell(tag, text, classArr){                    
    const cell = document.createElement(tag);
    if (classArr.length > 0) {
        classArr.forEach((item) => {
            cell.classList.add(item); 
        });
    }                
    const cellText = document.createTextNode(text);
    cell.appendChild(cellText);          
    return cell;
}