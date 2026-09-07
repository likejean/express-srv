// Update Article Paragraph Quantity Based on Input
// Adjusts the content editor to match the specified number of paragraphs
// Each paragraph is denoted by a section symbol (§) followed by its number
document.getElementById("articleParagraphQuantity").addEventListener("input", updateArticleParagraphQty);


// Function to update the article content based on the desired paragraph quantity
function updateArticleParagraphQty() {
    const paragraphQuantity = document.getElementById("articleParagraphQuantity").value;
    const articleContent = document.getElementById("articleContent");
	const editor = window.articleContentEditor;
	const currentText = editor ? editor.getText().trimEnd() : articleContent.value;
    
	// Count current paragraphs in the content
	let currentParagraphs = currentText.split("\n").filter(para => para.trim() !== "").length;

	// If the desired quantity is greater than current, add paragraphs
	while (currentParagraphs < paragraphQuantity) {
		if (editor) {
			editor.insertText(editor.getLength() - 1, `§${currentParagraphs + 1}\n\n`);
		} else articleContent.value += `§${currentParagraphs + 1}\n\n`;
		currentParagraphs++;
		_articlefactory.newArticleFormInputs["content"].value = editor ? editor.root.innerHTML : articleContent.value;
		
	}
	// If the desired quantity is less than current, remove paragraphs
	while (currentParagraphs > paragraphQuantity) {
		const paragraphs = (editor ? editor.getText() : articleContent.value).split("\n");
		paragraphs.splice(-3, 2); // Remove last paragraph and its two newlines
		if (editor) {
			editor.setText(paragraphs.join("\n"));
		} else articleContent.value = paragraphs.join("\n");
		currentParagraphs--;
		if (currentParagraphs === 0) {
			if (editor) editor.setText("");
			else articleContent.value = "";
		}
	}

	
}
