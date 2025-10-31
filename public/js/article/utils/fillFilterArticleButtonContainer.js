const filterButtonContainer = document.getElementById("filter-button-container");

function fillFilterArticleButtonContainer() {
        Object.entries(articleCategoryCollection).forEach(([key, obj]) => {
        const filterButton = document.createElement("button");
        filterButton.classList.add("btn", "btn-outline-primary", "m-1");
        filterButton.id = key;
        filterButton.textContent = key;
        filterButtonContainer.appendChild(filterButton);
    });
}

fillFilterArticleButtonContainer(); 