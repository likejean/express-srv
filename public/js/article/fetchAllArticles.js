//data storage object to hold all fetched calibration procedure articles data
const _store = new dataStorage();   

//function to fetch all articles
const fetchAllArticles = async () => {

	// fetch all data using POST API endpoints: articles
	await axios.get("/api/articles", {
			headers: getRequestHeaders()
		})
		.then((result) => {
			_store.articles = result;	
			renderAllArticles(_store.articles.data);

		})
		.catch((error) => {
			//display error message if data fetch failure occurs or any other internal error detected
			console.log(error);
		}
	);
}

//call fetchArticleRecordById function on page load
fetchAllArticles();