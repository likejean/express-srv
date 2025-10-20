const articleContainer = document.querySelector(".article-container");


function renderAllArticles(articles) {
	
	articles.forEach(article => {
		// Create article card element
		const articleCard = document.createElement("div");
		articleCard.classList.add("card", "shadow-sm", "article-card", "p-3", "mb-5", "bg-white");
		articleCard.style.border = "2px solid rgba(242, 238, 238, 1)";
		articleCard.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
		articleCard.style.padding = "20px";
		articleCard.style.marginBottom = "30px";
		articleCard.style.borderRadius = "20px";

		// Create card body
		const cardBody = document.createElement("div");
		cardBody.classList.add("card-body");

		// Create article title
		const articleTitle = document.createElement("h5");
		articleTitle.classList.add("card-title", "article-title", "text-center");
		articleTitle.style.fontWeight = "bold";
		articleTitle.style.fontSize = "1.85rem";
		articleTitle.style.marginBottom = "3rem";
		articleTitle.innerText = article.title;

		// Create main row
		// <div class="col-lg-8 col-sm-12 mb-sm-4 mt-5">
		const mainRow = document.createElement("div");
		mainRow.classList.add("row");
		mainRow.classList.add("mb-3");
		mainRow.style.alignItems = "center";
		mainRow.style.justifyContent = "center";
		mainRow.style.border = "2px solid rgba(242, 238, 238, 1)";
		mainRow.style.backgroundColor = "rgba(242, 238, 238, 1)";
		mainRow.style.borderRadius = "20px";
		
		const contentCol = document.createElement("div");
		contentCol.classList.add("col-lg-7", "col-sm-12", "mb-sm-4", "mt-5");
		
		
		const imageCol = document.createElement("div");
		imageCol.classList.add("col-lg-5", "col-sm-12", "mb-sm-4", "mt-5");
		
		// Create article content
		const articleContent = document.createElement("p");
		articleContent.classList.add("card-text", "article-content");
		articleContent.innerText = article.content;
		contentCol.appendChild(articleContent);

		// Create article formula
		const articleFormula = document.createElement("p");
		articleFormula.classList.add("card-text", "article-formula");
		articleFormula.innerText = article.formula;

		// Create article image
		const articleImage = document.createElement("img");
		articleImage.classList.add("article-image");
		articleImage.style.borderRadius = "20px";
		articleImage.style.maxWidth = "20rem";
		articleImage.src = article.imageLink;
		articleImage.alt = article.title;
		imageCol.appendChild(articleImage);

		// Append content and image columns to main row


		mainRow.appendChild(contentCol);
		mainRow.appendChild(imageCol);
		

		// Create article resource link
		const articleResourceLink = document.createElement("a");
		articleResourceLink.classList.add("article-resource-link");
		articleResourceLink.href = article.resourceLink;
		articleResourceLink.innerText = "View Resource";

		// Append elements to card body
		cardBody.appendChild(articleTitle);
		cardBody.appendChild(articleFormula);
		cardBody.appendChild(mainRow);
		cardBody.appendChild(articleResourceLink);

		// Append card body to article card
		articleCard.appendChild(cardBody);

		// Append article card to article container
		articleContainer.appendChild(articleCard);
		MathJax.typesetPromise([articleContainer]);
	});
}
