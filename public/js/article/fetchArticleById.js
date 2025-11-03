const articleCategory = document.querySelector(".article-category");
const articleTitle = document.getElementById("articleTitle");
const articlePreface = document.getElementById("articlePreface");
const articleContent = document.getElementById("articleContent");
const articleImageLink = document.getElementById("imageLink");
const articleResourceLink = document.getElementById("resourceLink");


//data storage object to hold all fetched calibration procedure articles data
//for editArticle.html page
const _store = new dataStorage();   

//data storage object to hold all fetched calibration procedure articles data
//obtain query string by id

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

//this function fetches a single calibration procedure by ID
const fetchArticleById = async () => {
	// fetch all data using POST API endpoints: article
    await axios
		.get(`../api/articles/${id}`, { headers: getRequestHeaders() })
		.then((result) => {			
			_store.activeArticle = result.data.article;
			articleCategory.innerText = _store.activeArticle.scienceBranch;
			articleTitle.innerText = _store.activeArticle.title;
			articlePreface.innerText = _store.activeArticle.preface;
			articleContent.innerText = _store.activeArticle.content;
			articleImageLink.innerText = _store.activeArticle.imageLink;
			articleResourceLink.innerText = _store.activeArticle.resourceLink;

		})
		.catch((error) => {
			//display error message if data fetch failure occurs or any other internal error detected
			console.log(error);
		});
}

fetchArticleById();