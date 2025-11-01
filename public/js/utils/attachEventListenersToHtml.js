//function to attach event listeners to HTML elements (icons, buttons, ext.)
// This function takes an array of html elements and a callback function as arguments
function attachEventListenersToHtml (html, callbackFn) {		
		html.forEach(elem => {
			elem.addEventListener('click', callbackFn);
	});
}	
