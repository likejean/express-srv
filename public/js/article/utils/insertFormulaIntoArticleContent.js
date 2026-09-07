function attachFormulaInsertion(content, formulaEditor, insertButton) {
	if (!content || !formulaEditor || !insertButton) return;

	// Insert formula into content at cursor position
	insertButton.addEventListener("click", () => {
		const latex = formulaEditor.getValue("latex").trim();
		if (!latex) return;

		const formula = `\\(${latex}\\)`;
		if (window.articleContentEditor) {
			const range = window.articleContentEditor.getSelection(true);
			const index = range ? range.index : window.articleContentEditor.getLength();
			window.articleContentEditor.insertText(index, formula);
			window.articleContentEditor.setSelection(index + formula.length, 0);
		} else {
			const start = content.selectionStart ?? content.value.length;
			const end = content.selectionEnd ?? start;
			content.value = `${content.value.slice(0, start)}${formula}${content.value.slice(end)}`;
			content.setSelectionRange(start + formula.length, start + formula.length);
			content.dispatchEvent(new Event("input", { bubbles: true }));
		}
		formulaEditor.value = "";
		content.focus();
	});
}

// Attach formula insertion to the article content area
function attachArticleContentFormulaInsertion() {
	attachFormulaInsertion(
		document.getElementById("articleContent"),
		document.getElementById("articleContentFormulaEditor"),
		document.getElementById("insertArticleContentFormula")
	);
}

// Call the function to attach formula insertion functionality
attachArticleContentFormulaInsertion();
