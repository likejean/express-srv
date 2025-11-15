const filterButtonContainer = document.getElementById("filter-button-container");
const filterButtonActiveStatusObject = {};


//this function fills the filter button container with buttons for each article category
function fillFilterArticleButtonContainer() {
    Object.entries(articleCategoryCollection).forEach(([key, obj]) => {
        const filterButton = document.createElement("button");
        filterButton.classList.add("btn", "btn-outline-primary", "m-2", "filter-button", "position-relative");
        filterButton.id = key;
        filterButton.textContent = key;
        filterButtonContainer.appendChild(filterButton);
		filterButtonActiveStatusObject[key] = false;
    });

	//create and append "All Articles" filter button
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

//invoke the function to fill the filter button container
fillFilterArticleButtonContainer(); 