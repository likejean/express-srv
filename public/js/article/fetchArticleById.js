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
		})
		.catch((error) => {
			//display error message if data fetch failure occurs or any other internal error detected
			console.log(error);
		});
}

fetchArticleById();