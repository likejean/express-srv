// function to add a text node to an HTML element
function addTextNodeToHtmlElement (name, htmlElement){
    const text = document.createTextNode(name);
    htmlElement.appendChild(text); 
}