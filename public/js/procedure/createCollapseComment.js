// Function to create a collapsible comment section in a table cell
// Usage: createCollapseComment(tag, idx, comment)
// Example: createCollapseComment('td', 1, 'This is a comment')

function createCollapseComment (tag, idx, comment, procedureId) {    
    
	// create a table cell element with the specified tag
	// and add the classes for responsive visibility
    let cell = document.createElement(tag);
	["d-none", "d-lg-table-cell"].forEach(classItem => cell.classList.add(classItem));

	//create the open and close buttons and the comment text element
	let openBtn = document.createElement("button");
    let closeBtn = document.createElement("button");
	let articleBtn = document.createElement("button");
    let commentTextElem = document.createElement("div");
	let editProcedureNavLinkWrap = document.createElement("a");
	
	//add classes to the buttons and comment text element
    ["btn", "btn-primary", "mt-2"].forEach(classItem => openBtn.classList.add(classItem));
	["btn", "btn-info"].forEach(classItem => articleBtn.classList.add(classItem));
    ["btn", "btn-danger", "m-3"].forEach(classItem => closeBtn.classList.add(classItem));
    ["card", "card-body"].forEach(classItem => commentTextElem.classList.add(classItem));

	//set attributes and text for the buttons and comment text element
    openBtn.setAttribute("id", `open-button-${idx}`);
	articleBtn.setAttribute("id", `article-button-${idx}`);

	// Link to the edit procedure page with the procedure ID as a query parameter	
	editProcedureNavLinkWrap.setAttribute("href", `../html/editProcedure.html?id=${procedureId}`);
	

	// Create the icon element
	const openIcon = document.createElement('i');	
	openIcon.classList.add('fa-solid', 'fa-folder-closed'); // Font Awesome folder closed icon	
	const articleIcon = document.createElement('i');
	articleIcon.classList.add('fa-solid', 'fa-sheet-plastic'); // Font Awesome document icon
	articleIcon.style.color = 'white';
	
	// Append the icon to the button
	openBtn.appendChild(openIcon);
    openBtn.style.display = 'block';
	articleBtn.appendChild(articleIcon);
	articleBtn.style.display = 'none';

	// Create the close icon element
	const closeIcon = document.createElement('i');
	closeIcon.classList.add('fa-solid', 'fa-rectangle-xmark'); // Font Awesome rectangular xmark icon
	closeBtn.appendChild(closeIcon);

	// Set the text for the buttons
    closeBtn.setAttribute("id", `close-button-${idx}`);	
    closeBtn.style.display = 'none';

	// Set the comment text and its attributes
    commentTextElem.setAttribute("id", `comment-text-${idx}`);
    commentTextElem.innerText = comment;
    commentTextElem.style.display = 'none';
	commentTextElem.style.fontSize = '0.7rem';
	commentTextElem.style.whiteSpace = 'pre-wrap'; // Preserve whitespace and line breaks
	commentTextElem.style.border = '3px solid #a1f9f0ff';
	commentTextElem.style.backgroundColor = '#f0f8ff';
	commentTextElem.style.padding = '10px';
	commentTextElem.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.1)';
	

	const btnDiv = document.createElement("div");
	editProcedureNavLinkWrap.appendChild(articleBtn);
	btnDiv.classList.add("d-flex", "justify-content-center", "align-items-center", "mb-2");
	btnDiv.appendChild(openBtn);
	btnDiv.appendChild(editProcedureNavLinkWrap);
	btnDiv.appendChild(closeBtn);

	// Append the buttons and comment text element to the cell    
    [commentTextElem, btnDiv].forEach(elem => cell.appendChild(elem));


	// Add event listeners for the open and close buttons
	// When the open button is clicked, it hides itself, shows the close button, and displays the comment text
    openBtn.onclick = function (e) {
		let id = getLastPart(e.currentTarget.id, "-");
		document.getElementById(`open-button-${id}`).style.display = 'none';
		document.getElementById(`comment-text-${id}`).style.display = 'block';
		document.getElementById(`close-button-${id}`).style.display = 'block';
		document.getElementById(`article-button-${id}`).style.display = 'block';
        
    }

	// When the close button is clicked, it hides itself, shows the open button, and hides the comment text	
    closeBtn.onclick = function (e) {
        let id = getLastPart(e.currentTarget.id, "-");
        document.getElementById(`close-button-${id}`).style.display = 'none';
        document.getElementById(`open-button-${id}`).style.display = 'block';
        document.getElementById(`comment-text-${id}`).style.display = 'none';
		document.getElementById(`article-button-${id}`).style.display = 'none';
    }
    return cell;
}

// Helper function to get the last part of a string after a specific character
function getLastPart(str, char) {
    const parts = str.split(char);
    return parts.pop();
}
