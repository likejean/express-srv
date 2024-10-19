//object stores all html elements being dynamically updated by Javascript
const htmlElementCollection = {};

function getHtmlElementsById () {
    for (const [key, value] of Object.entries(htmlClassCollection)) { 
        htmlElementCollection[key] = document.getElementById(value);
    }
    return htmlElementCollection;
}