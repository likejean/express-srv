// Update Article Paragraph Quantity Based on Input
// Adjusts the content textarea to match the specified number of paragraphs
// Each paragraph is denoted by a section symbol (§) followed by its number
document.getElementById("articleParagraphQuantity").addEventListener("input", updateArticleParagraphQty);


// Function to update the article content based on the desired paragraph quantity
function updateArticleParagraphQty() {
    const paragraphQuantity = document.getElementById("articleParagraphQuantity").value;
    const articleContent = document.getElementById("articleContent");
    
	// Count current paragraphs in the content
	let currentParagraphs = articleContent.value.split("\n").filter(para => para.trim() !== "").length;

	// If the desired quantity is greater than current, add paragraphs
	while (currentParagraphs < paragraphQuantity) {
		articleContent.value += `§${currentParagraphs + 1}\n\n`;
		currentParagraphs++;
		currentParagraphs >= 1 ? articleContent.disabled = false : null;
		_articlefactory.newArticleFormInputs["content"].value = articleContent.value;
		_articlefactory.isFormInputFieldEmpty("content") ? articleContent.style.border = "3px solid red" : articleContent.style.border = "2px solid blue";
		
	}
	// If the desired quantity is less than current, remove paragraphs
	while (currentParagraphs > paragraphQuantity) {
		const paragraphs = articleContent.value.split("\n");
		paragraphs.splice(-3, 2); // Remove last paragraph and its two newlines
		articleContent.value = paragraphs.join("\n");
		currentParagraphs--;
		if (currentParagraphs === 0) {
			articleContent.value = "";
			_articlefactory.newArticleFormInputs["content"].value = articleContent.value;
			articleContent.style.border = "3px solid red";
			articleContent.disabled = true;
		}
	}

	
}
