function attachFormulaInsertion(content, formulaEditor, insertButton) {
	if (!content || !formulaEditor || !insertButton) return;

	// Insert formula into content at cursor position
	insertButton.addEventListener("click", () => {
		const latex = formulaEditor.getValue("latex").trim();
		if (!latex) return;

		const start = content.selectionStart ?? content.value.length;
		const end = content.selectionEnd ?? start;
		const formula = `\\(${latex}\\)`;
		content.value = `${content.value.slice(0, start)}${formula}${content.value.slice(end)}`;
		content.setSelectionRange(start + formula.length, start + formula.length);
		content.dispatchEvent(new Event("input", { bubbles: true }));
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
