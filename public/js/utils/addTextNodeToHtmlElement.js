function addTextNodeToHtmlElement (name, htmlElement){
    const text = document.createTextNode(name);
    htmlElement.appendChild(text); 
}