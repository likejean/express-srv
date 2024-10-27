function iconClickEventCallback(event) {
    const wrapperName = trimBySubstring(event.target.id, "Icon").concat(
      "Wrapper"
    );
    const wrapper = document.getElementById(wrapperName);
    let input = document.createElement("input");
    let icon = document.getElementById(
      calibrationInputContainer[wrapperName].name.concat("Icon")
    );

  //creates toggle functionality for icons in Calibration Summary Card
  if (!calibrationInputContainer[wrapperName].status) {
      icon.classList.replace("fa-circle-dot", "fa-file-pen");
      calibrationInputContainer[wrapperName].childNodes = Array.from(
        wrapper.childNodes
      );
      removeAllChildNodes(wrapper);
      calibrationInputContainer[wrapperName].status = true;
      input.classList.add(calibrationInputContainer[wrapperName].class);
      input.setAttribute("name", calibrationInputContainer[wrapperName].name);
      input.setAttribute("type", calibrationInputContainer[wrapperName].type);
      input.setAttribute("style", "border-color:blue;");

      wrapper.appendChild(input);
      input.addEventListener("input", inputChangeValueCallback);
  } else {
      input.removeEventListener("input", inputChangeValueCallback);
      document.getElementById("inputErrorMessage").textContent = "";
      removeAllChildNodes(wrapper);
      icon.classList.replace("fa-file-pen", "fa-circle-dot");
      calibrationInputContainer[wrapperName].status = false;
      wrapper.append(...calibrationInputContainer[wrapperName].childNodes);
      calibrationInputContainer[wrapperName].childNodes = [];
  }
}
