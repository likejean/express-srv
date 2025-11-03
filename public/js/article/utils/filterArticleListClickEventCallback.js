function filterArticleListClickEventCallback(event) {
    // Get the new value from the input field
    const id = event.target.id;   
	
	if (id === "All") {
		updateFilterButtonActiveObject(id, _store.articles.length);
		removeAllChildNodes(articleContainer);
		if(_store.articles.length === 0) emptySearchResultsUserNotification(articleContainer);
		renderAllArticles(_store.articles);
	}  	
	else {

		const filteredArticleByCategory = _store.articles.filter(article => article.scienceBranch === id);

		updateFilterButtonActiveObject(id, filteredArticleByCategory.length);
		removeAllChildNodes(articleContainer);	
		if(filteredArticleByCategory.length === 0) emptySearchResultsUserNotification(articleContainer);
		renderAllArticles(filteredArticleByCategory);
	}

}


function updateFilterButtonActiveObject(btnId, size) {
	Object.keys(filterButtonActiveStatusObject).forEach(key => {
		if (filterButtonActiveStatusObject[key] === true)
			{
				const button = document.getElementById(key);
				button.style.backgroundColor = "";
				button.style.removeProperty("font-weight");
				button.removeChild(button.lastChild);
				filterButtonActiveStatusObject[key] = false;
			}
		
	});

	const button = document.getElementById(btnId);
	button.style.backgroundColor = "cyan";
	button.style.fontWeight = "bold";
	filterButtonActiveStatusObject[btnId] = true;
	const span = document.createElement("span");
	span.classList.add("position-absolute", "top-0", "start-100", "translate-middle", "badge", "rounded-pill", "bg-danger");
	span.innerText = size;
	button.appendChild(span);
}

function emptySearchResultsUserNotification (container) {
	const alertWrapper = document.createElement("div");
	alertWrapper.classList.add("alert", "alert-warning", "w-100", "mx-2");
	alertWrapper.setAttribute("role", "alert");
	alertWrapper.textContent = "No articles found for this category"
	container.appendChild(alertWrapper);
}

