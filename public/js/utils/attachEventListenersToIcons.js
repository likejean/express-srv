//function to attach event listeners to icons
// This function takes an array of icons and a callback function as arguments
function attachEventListenersToIcons (icons, callbackFn) {		
		icons.forEach(icon => {
			icon.addEventListener('click', callbackFn);
	});
}	
