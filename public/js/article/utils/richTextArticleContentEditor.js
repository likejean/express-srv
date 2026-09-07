function initializeRichTextArticleContentEditor(editorElement, contentValue, initialValue, onChange) {
	const editor = new Quill(editorElement, {
		theme: "snow",
		modules: {
			toolbar: [
				[{ header: [1, 2, 3, false] }],
				[{ size: ["small", false, "large", "huge"] }],
				["bold", "italic", "underline", "strike"],
				[{ color: [] }, { background: [] }],
				[{ align: [] }],
				[{ list: "ordered" }, { list: "bullet" }],
				["link", "clean"]
			]
		}
	});

	if (initialValue) {
		/<[a-z][\s\S]*>/i.test(initialValue)
			? editor.clipboard.dangerouslyPasteHTML(initialValue)
			: editor.setText(initialValue);
	}

	const updateContentValue = () => {
		contentValue.value = editor.root.innerHTML;
		if (onChange) onChange(contentValue.value);
	};
	editor.on("text-change", updateContentValue);
	updateContentValue();

	return editor;
}

window.initializeRichTextArticleContentEditor = initializeRichTextArticleContentEditor;

const articleContentValue = document.getElementById("articleContent");
const articleContentEditorElement = document.getElementById("articleContentEditor");
if (articleContentValue && articleContentEditorElement) {
	window.articleContentEditor = initializeRichTextArticleContentEditor(
		articleContentEditorElement,
		articleContentValue,
		articleContentValue.value,
		(value) => {
			_articlefactory.newArticleFormInputs.content.value = value;
			articleContentValue.dispatchEvent(new Event("input", { bubbles: true }));
		}
	);
}
