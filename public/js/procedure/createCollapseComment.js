function createCollapseComment (tag, data, comment) {    
    //add any html attributes (if any)
	let collapseBtn = document.createElement(tag);
    ["btn", "btn-primary", "d-none", "d-lg-table-cell", "mt-2"].forEach(classItem => collapseBtn.classList.add(classItem));
    collapseBtn.setAttribute('id', `${data._id}`);
    collapseBtn.setAttribute("type","button");		
    collapseBtn.setAttribute("data-toggle", "#collapseProcedureComment");
    collapseBtn.setAttribute("aria-expanded", "false");  
    collapseBtn.setAttribute("aria-controls", "collapseProcedureComment");  
    collapseBtn.innerText = "Details";


    return collapseBtn;
}