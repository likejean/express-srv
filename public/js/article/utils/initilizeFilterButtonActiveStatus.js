function initializeFilterButtonActiveStatus() {

	const span = document.createElement("span");
	span.classList.add("position-absolute", "top-0", "start-100", "translate-middle", "badge", "rounded-pill", "bg-danger");
	span.innerText = _store.articles.length;
	document.getElementById("All").appendChild(span);
	if(_store.articles.length === 0) emptySearchResultsUserNotification(articleContainer);
}




