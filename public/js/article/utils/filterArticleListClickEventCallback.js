

function filterArticleListClickEventCallback(event) {
    // Get the new value from the input field
    const id = event.target.id;   
	
	if (id === "All") {
		updateFilterButtonActiveObject(id, _store.articles.length);
		removeAllChildNodes(articleContainer);
		renderAllArticles(_store.articles);
	}  	
	else {

		const filteredArticleByCategory = _store.articles.filter(article => article.scienceBranch === id);

		updateFilterButtonActiveObject(id, filteredArticleByCategory.length);
		removeAllChildNodes(articleContainer);
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