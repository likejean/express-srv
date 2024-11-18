function viewCertificateComment(id, comment) {
	var commentText = document.createElement("p");
	var minimizeIcon = document.createElement("i");
	var hr = document.createElement("hr");

	const toastHtmlElement = document.getElementById(id);
	const toastHtmlBody = toastHtmlElement.querySelector('.toast-body');
	const toastHtmlHeader = toastHtmlElement.querySelector('.toast-header');
	const infoIcon = toastHtmlHeader.querySelector('.fa-info-circle');	
	if(_store.certificateInfoIcon === undefined) _store.certificateInfoIcon = {};
	_store.certificateInfoIcon[id] = infoIcon;
	

	["alert", "alert-success", "my-2"].forEach(classItem => commentText.classList.add(classItem));
	commentText.innerText = comment;
	
	["fa-solid", "fa-2x", "fa-minimize"].forEach(classItem => minimizeIcon.classList.add(classItem));
	minimizeIcon.setAttribute("onclick", `closeCertificateComment('${id}')`);

	toastHtmlHeader.replaceChild(minimizeIcon, infoIcon);
	toastHtmlBody.appendChild(hr);
	toastHtmlBody.appendChild(commentText);
	

}

function closeCertificateComment(id) {

	const toastHtmlElement = document.getElementById(id);
	const toastHtmlBody = toastHtmlElement.querySelector('.toast-body');
	const certificationInfoComment = toastHtmlBody.querySelector('.alert-success');
	const hr = toastHtmlBody.getElementsByTagName("hr"); 
	const toastHtmlHeader = toastHtmlElement.querySelector('.toast-header');
	const minimizeIcon = toastHtmlHeader.querySelector('.fa-minimize');

	toastHtmlHeader.replaceChild(_store.certificateInfoIcon[id], minimizeIcon);
	delete _store.certificateInfoIcon[id];
	toastHtmlBody.removeChild(certificationInfoComment);
	toastHtmlBody.removeChild(hr[0]);

}