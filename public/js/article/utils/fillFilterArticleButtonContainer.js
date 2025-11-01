const filterButtonContainer = document.getElementById("filter-button-container");
const filterButtonActiveStatusObject = {};

function fillFilterArticleButtonContainer() {
    Object.entries(articleCategoryCollection).forEach(([key, obj]) => {
        const filterButton = document.createElement("button");
        filterButton.classList.add("btn", "btn-outline-primary", "m-2", "filter-button", "position-relative");
        filterButton.id = key;
        filterButton.textContent = key;
        filterButtonContainer.appendChild(filterButton);
		filterButtonActiveStatusObject[key] = false;
    });

	const filterButton = document.createElement("button");
	filterButton.classList.add("btn", "btn-outline-secondary", "m-2", "filter-button", "position-relative");
	filterButton.id = "All";
	filterButton.textContent = "All Articles";
	filterButtonContainer.appendChild(filterButton);
	const button = document.getElementById("All");
	button.style.background = "cyan";
	button.style.fontWeight = "bold";	
	filterButtonActiveStatusObject["All"] = true;


}

fillFilterArticleButtonContainer(); 