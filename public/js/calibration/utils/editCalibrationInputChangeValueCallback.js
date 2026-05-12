//////////Callback function for ONCHANGE eventListener in "editCalibrationIconClickEventCallback.js"

// Convert the date input value into the date token format used in calibration names.
// Example: 2025-03-15 => 15032025
function formatDateForCalibrationName(dateString) {
    const date = moment(dateString, "YYYY-MM-DD", true);
    if (!date.isValid()) return null;
    return date.format("DDMMYYYY");
}

// Derive an updated calibrationName when lastCalibrationDate changes.
// Preserve the existing EID prefix and other suffix text, updating only the date part.
function deriveCalibrationNameFromDate(dateString) {
    const dateToken = formatDateForCalibrationName(dateString);
    if (!dateToken) return null;

    const currentName = _calfactory.inputWrappers.calNameWrapper.status
        ? _calfactory.inputWrappers.calNameWrapper.value
        : _calfactory.calibrationName;
    if (!currentName) return null;

    // Split at the first dash to preserve any suffix after the calibration date.
    const suffixParts = currentName.split("-");
    const namePrefix = suffixParts[0];
    const suffix = suffixParts.slice(1).join("-");

    const sensorEID = _calfactory.sensor?.EID || "";
    // If the current name begins with a known sensor EID, preserve that prefix.
    if (sensorEID && namePrefix.startsWith(sensorEID)) {
        return `${sensorEID}${dateToken}${suffix ? "-" + suffix : ""}`;
    }

    const dateSegmentMatch = namePrefix.match(/(\d{8})$/);
    if (dateSegmentMatch) {
        const preservedPrefix = namePrefix.slice(0, -dateSegmentMatch[1].length);
        return `${preservedPrefix}${dateToken}${suffix ? "-" + suffix : ""}`;
    }

    const leadingDigits = namePrefix.match(/^(\d+)/);
    if (leadingDigits) {
        const preservedPrefix = namePrefix.slice(0, leadingDigits[1].length);
        return `${preservedPrefix}${dateToken}${suffix ? "-" + suffix : ""}`;
    }

    return `${namePrefix}${dateToken}${suffix ? "-" + suffix : ""}`;
}

function editCalibrationInputChangeValueCallback(event) {
    // Get the new value from the input field
    const newValue = event.target.value;
    const inputType = event.target.type;    
    const concatInputName = event.target.name.concat("Wrapper");

    //Display warning message at the bottom of the card for any invalid input entries
    _calfactory.inputWrappers[concatInputName].validator &&
    _calfactory.inputWrappers[concatInputName].validator(newValue)
        ? (document.getElementById("inputErrorMessage").textContent = "")
        : (document.getElementById("inputErrorMessage").textContent =
        _calfactory.inputWrappers[concatInputName].inputRule);

    //Update GLOBAL CALIBRATION FACTORY state upon each new value entered
    if (inputType === "checkbox")
        _calfactory.inputWrappers[concatInputName].checked = this.checked;
    else _calfactory.inputWrappers[concatInputName].value = newValue;

    if (event.target.name === "lastCalDate") {
        // When the last calibration date changes, update the visible calibration name immediately.
        const updatedName = deriveCalibrationNameFromDate(newValue);
        if (updatedName) {
            _calfactory.calibrationName = updatedName;
            const currentCalName = document.getElementById("calName");
            if (currentCalName) currentCalName.innerText = updatedName;

            // If the name field is currently in edit mode, keep the input value in sync.
            if (_calfactory.inputWrappers.calNameWrapper.status) {
                const calNameInput = document.querySelector('input[name="calName"]');
                if (calNameInput) {
                    calNameInput.value = updatedName;
                    _calfactory.inputWrappers.calNameWrapper.value = updatedName;
                }
            }
        }
    }

    const patchButton = document.getElementById("patch-cal-record");
    if (patchButton) {
        patchButton.disabled = !_calfactory.isPatchButtonActive();
    }
}
