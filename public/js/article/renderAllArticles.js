
const articleContainer = document.querySelector(".article-container");

// Function to render all articles
function renderAllArticles(articles) {
	
	//this function creates article cards and appends them to the article container
	articles.forEach(article => {
					
		
		// Create science branch badge
		const articleCategoryRow = document.createElement("div");
		articleCategoryRow.classList.add("text-end");
		const scienceBranchBadge = document.createElement("span");
		scienceBranchBadge.classList.add("badge");
		scienceBranchBadge.style.backgroundColor = "rgba(0, 123, 255, 0.8)";
		scienceBranchBadge.style.color = "white";
		scienceBranchBadge.style.fontSize = "0.75rem";
		scienceBranchBadge.style.padding = "10px 20px";
		scienceBranchBadge.style.fontWeight = "bold";
		scienceBranchBadge.style.width = "165px";
		scienceBranchBadge.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.3)";
		scienceBranchBadge.style.margin = "-50px 0px 0px -150px";
		scienceBranchBadge.style.textTransform = "uppercase";
		scienceBranchBadge.style.borderRadius = "15px";
		scienceBranchBadge.style.position = "absolute";
		scienceBranchBadge.innerText = article.scienceBranch;
		articleCategoryRow.appendChild(scienceBranchBadge);

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


		// Create article title bootstrap row
		const articleTitleRow = document.createElement("div");
		articleTitleRow.classList.add("row");


		// Create article title column
		const articleTitleCol = document.createElement("div");
		articleTitleCol.classList.add("col-lg-11", "col-sm-11", "d-flex", "align-self-center", "justify-content-center");
		const deleteArticleCol= document.createElement("div");
		deleteArticleCol.classList.add("col-lg-1", "col-sm-1", "d-flex", "align-self-center", "justify-content-end");

		// Create article title
		const articleTitle = document.createElement("h5");
		articleTitle.classList.add("text-center");
		articleTitle.style.fontWeight = "bold";
		articleTitle.style.fontSize = "1.85rem";
		articleTitle.style.marginBottom = "1rem";
		articleTitle.innerText = article.title;
		articleTitleCol.appendChild(articleTitle);
		articleTitleRow.appendChild(articleTitleCol);
  
		// Create delete article button
		const deleteArticleBtn = document.createElement("button");
		deleteArticleBtn.classList.add("btn", "btn-danger", "mb-4", "mx-1");
		deleteArticleBtn.style.marginTop = "1rem";
		deleteArticleCol.appendChild(deleteArticleBtn);

		// Create delete icon for the button
		const deleteIcon = document.createElement("i");
		deleteIcon.classList.add("fas", "fa-trash-alt");

		// Append delete icon to the button
		deleteArticleBtn.appendChild(deleteIcon);
		articleTitleRow.appendChild(deleteArticleCol);

		// Add event listener to delete article button
		deleteArticleBtn.addEventListener("click", () => deleteArticleById(article._id, article.title));
		
		// Create article preface
		const articlePreface = document.createElement("p");
		articlePreface.classList.add("card-text", "article-preface", "text-center", "mb-4", "background-light");
		articlePreface.innerText = article.preface;

		// Create card body row
		// <div class="col-lg-8 col-sm-12 mb-sm-4 mt-5">
		const cardBodyRow = document.createElement("div");
		cardBodyRow.classList.add("row", "d-flex", "mx-1");
		cardBodyRow.style.alignItems = "center";
		cardBodyRow.style.justifyContent = "center";
		cardBodyRow.style.border = "2px solid rgba(242, 238, 238, 1)";
		cardBodyRow.style.backgroundColor = "rgba(242, 238, 238, 1)";
		cardBodyRow.style.borderRadius = "20px";
		
		// Create content bootstrap column
		const contentCol = document.createElement("div");
		contentCol.classList.add("col-lg-7", "col-sm-12", "mb-sm-4", "mt-5");
		
		// Create image bootstrap column
		const imageCol = document.createElement("div");
		imageCol.classList.add("col-lg-5", "col-sm-12", "mb-sm-4", "mt-5");
		
		// Create article content
		const articleContent = document.createElement("p");
		articleContent.classList.add("card-text", "article-content");
		articleContent.innerText = article.content;
		contentCol.appendChild(articleContent);

		// Create article image
		const articleImage = document.createElement("img");
		articleImage.classList.add("article-image");
		articleImage.style.borderRadius = "20px";
		articleImage.style.maxWidth = "20rem";
		articleImage.src = article.imageLink;
		articleImage.alt = article.title;
		imageCol.appendChild(articleImage);

		// Create main row to hold content and image columns
		cardBodyRow.appendChild(contentCol);
		cardBodyRow.appendChild(imageCol);		

		// Create article resource link
		const articleResourceLink = document.createElement("a");
		articleResourceLink.classList.add("article-resource-link");
		articleResourceLink.classList.add("text-center");
		articleResourceLink.style.display = "block";
		articleResourceLink.style.marginTop = "2rem";
		articleResourceLink.style.fontWeight = "bold";
		articleResourceLink.style.fontSize = "1.5rem";
		articleResourceLink.href = article.resourceLink;
		articleResourceLink.innerText = "Resource Link";

		// Append elements to card body
		cardBody.appendChild(articleCategoryRow);
		cardBody.appendChild(articleTitleRow);
		cardBody.appendChild(articlePreface);
		cardBody.appendChild(cardBodyRow);
		cardBody.appendChild(articleResourceLink);

		// Append card body to article card
		articleCard.appendChild(cardBody);

		// Append article card to article container
		articleContainer.appendChild(articleCard);
		
		// Trigger MathJax typesetting for the newly added content
		MathJax.typesetPromise([articleContainer]);
	});
}
