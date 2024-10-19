//Function helper for removing all children from parent html node
function removeAllChildNodes(parent) {        
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
   