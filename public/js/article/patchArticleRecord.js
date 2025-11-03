function patchArticleRecord() {
    calPatchRequestData = {};

	//obtain query string by id
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");


  //get this helper function from utils...
    articlePatchRequestData = filterObjectAndTransform(_articlefactory.inputWrappers, (item) => item.status === true);    

  //use PATCH API endpoint to update existing calibration record
    axios
    .patch(`../api/articles/${id}`, articlePatchRequestData,
        { headers: getRequestHeaders() }
    )
    .then((response) => {
        icons.forEach((icon) => {
            icon.removeEventListener("click", editArticleIconClickEventCallback);
        });
        window.location.reload();
        console.log("Article record updated successfully:", response);              
    })
    .catch((error) => {
        console.log("ERROR", error);
    });
}
