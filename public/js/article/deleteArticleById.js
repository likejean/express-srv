function deleteArticleById(articleId) {
    fetch(`/api/articles/${articleId}`, {
        headers: getRequestHeaders()
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Optionally, you can remove the deleted article from the DOM or refresh the article list
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}