//attach event listener to all icons
function attachEventListenersToIcons (icons, callbackFn) {		
		icons.forEach(icon => {
			icon.addEventListener('click', callbackFn);
	});
}	
