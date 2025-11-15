function filterArticleListClickEventCallback(event) {
    // Get the new value from the input field
    const id = event.target.id;   
	
	//obtain article container
	if (id === "All") {
		updateFilterButtonActiveObject(id, _store.articles.length);
		removeAllChildNodes(articleContainer);
		if(_store.articles.length === 0) emptySearchResultsUserNotification(articleContainer);
		renderAllArticles(_store.articles);
	}  	
	else {

		//filter articles by category
		const filteredArticleByCategory = _store.articles.filter(article => article.scienceBranch === id);

		//update filter button active status object
		updateFilterButtonActiveObject(id, filteredArticleByCategory.length);
		removeAllChildNodes(articleContainer);	
		if(filteredArticleByCategory.length === 0) emptySearchResultsUserNotification(articleContainer);
		renderAllArticles(filteredArticleByCategory);
	}

}

//this function updates the filter button active status object
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

//this function notifies user if no articles found for selected category
function emptySearchResultsUserNotification (container) {
	const alertWrapper = document.createElement("div");
	alertWrapper.classList.add("alert", "alert-warning", "w-100", "mx-2");
	alertWrapper.setAttribute("role", "alert");
	alertWrapper.textContent = "No articles found for this category"
	container.appendChild(alertWrapper);
}

