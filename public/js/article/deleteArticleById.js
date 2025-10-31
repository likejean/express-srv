function deleteArticleById(articleId, articleTitle) {
	// Confirm deletion with the user
	if (confirm(`Are you sure you want to delete the article titled "${articleTitle}"? This action cannot be undone.`)) {
		axios.delete(`/api/articles/${articleId}`, {
			headers: getRequestHeaders()
		})
		.then(response => {
			if (response.status === 200) {
				console.log('Article deleted successfully');
				// Optionally, you can remove the deleted article from the DOM or refresh the article list
				window.location.reload();
			} else {
				console.log("Failed to delete article.");
			}
		})
		.catch((error) => {
			console.error('Error:', error);
			alert(`Failed to delete the article titled "${articleTitle}".`);
		});
	}    
}