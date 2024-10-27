function iconClickEventCallback(event) {
    const wrapperName = trimBySubstring(event.target.id, "Icon").concat(
      "Wrapper"
    );
    const wrapper = document.getElementById(wrapperName);
    let input = document.createElement("input");
    let icon = document.getElementById(
      _calfactory.inputWrappers[wrapperName].name.concat("Icon")
    );
    const patchButton = document.getElementById("patch-cal-record");

  //creates toggle functionality for icons in Calibration Summary Card
  if (!_calfactory.inputWrappers[wrapperName].status) {      
      icon.classList.replace("fa-circle-dot", "fa-file-pen");
      _calfactory.inputWrappers[wrapperName].childNodes = Array.from(wrapper.childNodes);
      removeAllChildNodes(wrapper);
      _calfactory.inputWrappers[wrapperName].status = true;
      input.classList.add(_calfactory.inputWrappers[wrapperName].class);
      input.setAttribute("name", _calfactory.inputWrappers[wrapperName].name);
      input.setAttribute("type", _calfactory.inputWrappers[wrapperName].type);
      input.setAttribute("style", "border-color:blue;");
      
      wrapper.appendChild(input);
      input.addEventListener("input", inputChangeValueCallback);      
      patchButton.disabled = !_calfactory.isPatchButtonActive();
  } else {
      input.removeEventListener("input", inputChangeValueCallback);
      document.getElementById("inputErrorMessage").textContent = "";
      removeAllChildNodes(wrapper);
      icon.classList.replace("fa-file-pen", "fa-circle-dot");
      _calfactory.inputWrappers[wrapperName].status = false;
      wrapper.append(..._calfactory.inputWrappers[wrapperName].childNodes);
      _calfactory.inputWrappers[wrapperName].childNodes = [];      
      patchButton.disabled = !_calfactory.isPatchButtonActive();
  }
}
