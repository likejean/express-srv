function createNewArticleRecord() {

    console.log(newArticlePostData);
//use POST API endpoint to create new article record
//axios post request to push a new article to the server
axios
    .post(`../api/articles`, newArticlePostData, {
			headers: getRequestHeaders()
		})
    .then((response) => {
        console.log("New article record created successfully:", response);
        //remove event listener to prevent multiple submissions
        form.removeEventListener("submit", submitNewArticleData);
        //redirect to viewCalibrationProcedures.html to edit the newly created article
        window.location.href = "../html/viewCalibrationProcedures.html";
    })
    .catch((error) => {
        console.log("ERROR:", error);
    });
}
    