//object stores all html elements being dynamically updated by Javascript
const htmlElementCollection = {};

//this function gets the html elements by their id and stores them in the htmlElementCollection object
//this function is used in multiple files, so it is exported to be used in other files
function getHtmlElementsById () {
    for (const [key, value] of Object.entries(htmlClassCollection)) { 
        htmlElementCollection[key] = document.getElementById(value);
    }
    return htmlElementCollection;
}