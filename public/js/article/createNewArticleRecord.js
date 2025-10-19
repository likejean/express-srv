function createNewArticleRecord() {
//use POST API endpoint to create new article record
//axios post request to push a new article to the server
axios
    .post(`../api/articles`, newArticlePostData, {
			headers: getRequestHeaders()
		})
    .then((response) => {
        console.log("New article record created successfully:", response);
        form.removeEventListener("submit", submitNewArticleData);
        window.location.href = "../index.html";
    })
    .catch((error) => {
        console.log("ERROR:", error);
    });
}
    