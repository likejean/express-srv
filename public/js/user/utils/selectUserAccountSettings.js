const accountSettingLinks = document.querySelectorAll(".list-group-item");
accountSettingLinks.forEach(node => {
		if(node.textContent === "General") node.classList.add("active");
	});

[].forEach.call(accountSettingLinks, function(e){e.addEventListener('click', activateSelectedNodeItemCallback, false)});

function activateSelectedNodeItemCallback(event) {
	event.target.classList.toggle("active");
	accountSettingLinks.forEach((node) => {
		if(node.textContent !== event.target.textContent && node.classList.contains("active")) {
			node.classList.remove("active");			
		}
	});	
}

