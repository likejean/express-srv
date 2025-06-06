
function createCollapseComment (tag, idx, comment) {    
    //add any html attributes (if any)

    let cell = document.createElement(tag);

	let openBtn = document.createElement("button");
    let closeBtn = document.createElement("button");
    let commentTextElem = document.createElement("div");
  
    ["btn", "btn-primary"].forEach(classItem => openBtn.classList.add(classItem));
    ["btn", "btn-danger", "m-3"].forEach(classItem => closeBtn.classList.add(classItem));
    ["card", "card-body"].forEach(classItem => commentTextElem.classList.add(classItem));

    openBtn.setAttribute("id", `open-button-${idx}`);
    openBtn.innerText = "View details";
    openBtn.style.display = 'block';
    closeBtn.setAttribute("id", `close-button-${idx}`);
    closeBtn.innerText = "Close details";
    closeBtn.style.display = 'none';
    commentTextElem.setAttribute("id", `comment-text-${idx}`);
    commentTextElem.innerText = comment;
    commentTextElem.style.display = 'none';

     cell.appendChild(openBtn);
    [openBtn, commentTextElem, closeBtn].forEach(elem => cell.appendChild(elem));


    openBtn.onclick = function (e) {
        let id = getLastPart(e.target.id, "-");
        document.getElementById(`open-button-${id}`).style.display = 'none';
        document.getElementById(`close-button-${id}`).style.display = 'block';
        document.getElementById(`comment-text-${id}`).style.display = 'block';
    }

    closeBtn.onclick = function (e) {
        let id = getLastPart(e.target.id, "-");
        document.getElementById(`close-button-${id}`).style.display = 'none';
        document.getElementById(`open-button-${id}`).style.display = 'block';
        document.getElementById(`comment-text-${id}`).style.display = 'none';
    }
    return cell;
}

function getLastPart(str, char) {
    const parts = str.split(char);
    return parts.pop();
}
