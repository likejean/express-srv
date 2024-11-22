function filterSensorsByDescription() {
	const sensorDescriptionTableHeader = document.getElementById("sensorDescriptionTableHeader");	
	const textNode = sensorDescriptionTableHeader.firstChild; 
	sensorDescriptionTableHeader.removeAttribute("onclick");
	sensorDescriptionTableHeader.removeAttribute("scope");
	sensorDescriptionTableHeader.removeChild(textNode);
	sensorDescriptionTableHeader.style.padding = "1px";
	
	const select = document.createElement('select');

	select.style.width = "100%";
	select.style.height = "40px";
	select.style.background = "#d3d3d3";
	

	["All", ..._store.getSensorDescriptionList(), "Clear Filter"].forEach((description) => {
		const option = document.createElement('option');
		if (description === "Clear Filter") {
			option.style.color = "red";
			option.style.fontWeight = "bold";			
		}
		option.value = description;
		option.text = description;
		select.appendChild(option);
	})

	select.addEventListener("change", (e) => {
		const optionSelected = e.target.value;
		if (optionSelected === "Clear Filter") {
			removeAllChildNodes(sensorDescriptionTableHeader)
			sensorDescriptionTableHeader.appendChild(textNode);
			sensorDescriptionTableHeader.setAttribute("onclick", "filterSensorsByDescription()");		
			sensorDescriptionTableHeader.setAttribute("scope", "col");
			sensorDescriptionTableHeader.removeAttribute("style");
		}
		
	});

	sensorDescriptionTableHeader.appendChild(select);

}