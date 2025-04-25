
//this function creates a thumbnail image from a base64 encoded string
//this function is used to render the image in the table cell
function createAvatarThumbnail(tag, bufferArr, classArr, attrArr){ 
	const tableCell = document.createElement(tag);                   
    const img = document.createElement("img");
	
    if (classArr.length > 0) {
        classArr.forEach((item) => {
            img.classList.add(item); 
        });
    }  
	if (attrArr.length > 0) {
        attrArr.forEach((item) => {
            img.setAttribute(item.attribute, item.value); 
        });
    }              

	//render decoded image
    img.src = `data:image/*; base64, ${toBase64(bufferArr)}`;
	tableCell.appendChild(img);

    return tableCell;
}