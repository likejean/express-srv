const calPriorityOptions = [
	"Mandatory", "Optional", "Unserviceable", "Broken"
];

function selectionOptionsInnerHtmlString (selectedText) {
	let innerHTMLString = '';		

	// Use a for loop to iterate over the option items
	for (let i = 0; i < calPriorityOptions.length; i++) {
		// Append each item to the HTML string			
		if (selectedText === calPriorityOptions[i]) 
			innerHTMLString += `<option value="${calPriorityOptions[i]}" selected>${calPriorityOptions[i]}</option>`;
		else 
			innerHTMLString += `<option value="${calPriorityOptions[i]}">${calPriorityOptions[i]}</option>`;
	}
	return innerHTMLString;
}
