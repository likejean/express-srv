function filterSensorsByDescription() {
	const sensorDescriptionTableHeader = document.getElementById("sensorDescriptionTableHeader");
	const textNode = sensorDescriptionTableHeader.firstChild; 
	sensorDescriptionTableHeader.removeAttribute("onclick");
	sensorDescriptionTableHeader.removeAttribute("scope");
	sensorDescriptionTableHeader.removeChild(textNode);
	sensorDescriptionTableHeader.style.padding = "0";
	
	console.log(_store.getSensorDescriptionList());

	const select = document.createElement('select');

	const option = document.createElement('option');
	option.value = "All";
	option.text = "All";
	select.appendChild(option);

	_store.getSensorDescriptionList().forEach((description) => {
		const option = document.createElement('option');
		option.value = description;
		option.text = description;
		select.appendChild(option);
	})

	sensorDescriptionTableHeader.appendChild(select);

	console.log(select);
}