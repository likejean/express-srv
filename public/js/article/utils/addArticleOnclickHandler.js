//function to handle onclick event to navigate to create new article page
//from the edit procedure page
const addArticleOnclickHandler = () => {
	document.getElementById("navigate-new-article-page").addEventListener("click", () => {
		window.location.href = "./createNewArticle.html";	
	});
};

//obtain query string by id
addArticleOnclickHandler();
